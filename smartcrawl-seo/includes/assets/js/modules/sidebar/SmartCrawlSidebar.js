import { __ } from '@wordpress/i18n';
import wp from 'wp';
import classnames from 'classnames';
import ConfigValues from '../../es6/config-values';
import SmartCrawlIcon from './SmartCrawlIcon';
import SmartCrawlHeaderToggle from './SmartCrawlHeaderToggle';
import SeoPanel from './panels/SeoPanel';
import ReadabilityPanel from './panels/ReadabilityPanel';
import SocialPanel from './panels/SocialPanel';
import AdvancedPanel from './panels/AdvancedPanel';
import MozPanel from './panels/MozPanel';
import Modal from '../../components/modal';
import { renderSidebarModal } from './utils/sidebar-portal';

const { useState, useCallback, useMemo, useEffect } = wp.element;

/**
 * Match metabox `renderIssueCount('seo')` (see `metabox.js`).
 *
 * @param {Object}   seo      Analysis payload from `wds_analysis_get_editor_analysis`.
 * @param {string[]} keywords Focus keyphrases.
 * @return {number}             Total issue count for SEO tab; -1 if no keywords (matches metabox behavior).
 */
function computeSeoTabIssueCount(seo, keywords) {
	if (!keywords || !keywords.length) {
		return -1;
	}
	let errCnt = 0;
	if (seo) {
		if (seo.primary_error_count) {
			errCnt += seo.primary_error_count;
		}
		if (seo.extra_keywords) {
			Object.values(seo.extra_keywords).forEach((keyword) => {
				const check = seo.extra_checks[keyword];
				errCnt += Object.keys(check?.errors || {}).length;
			});
		}
	}
	return errCnt;
}

const ALL_SIDEBAR_TABS = [
	{ key: 'seo', label: __('SEO', 'smartcrawl-seo') },
	{ key: 'readability', label: __('Readability', 'smartcrawl-seo') },
	{ key: 'social', label: __('Social', 'smartcrawl-seo') },
	{ key: 'advanced', label: __('Advanced', 'smartcrawl-seo') },
	{ key: 'moz', label: __('Moz', 'smartcrawl-seo') },
];

const SIDEBAR_TABS = ALL_SIDEBAR_TABS.filter((tab) => {
	const canSeoMetabox = ConfigValues.get_bool(
		'seo_metabox_can_view',
		'sidebar'
	);

	if (['seo', 'readability', 'social', 'advanced'].includes(tab.key)) {
		if (!canSeoMetabox) {
			return false;
		}
	}

	if (tab.key === 'readability') {
		return ConfigValues.get_bool('readability_active', 'sidebar');
	}
	// Match metabox `generateTabs()`: Social tab only when component + admin tab are on.
	if (tab.key === 'social') {
		return ConfigValues.get_bool('social_active', 'sidebar');
	}
	// Match legacy Moz URL metrics metabox: only show when connected + user can view.
	if (tab.key === 'moz') {
		return (
			ConfigValues.get_bool(['moz', 'connected'], 'sidebar') &&
			ConfigValues.get_bool(['moz', 'can_view'], 'sidebar')
		);
	}
	return true;
});

/**
 * SmartCrawl SEO Gutenberg sidebar.
 *
 * Renders the PluginSidebarMoreMenuItem (the "SmartCrawl SEO" entry in the
 * block editor's three-dot "Options" menu) and the PluginSidebar panel that
 * slides out from the right.
 *
 * Section shell: inline sections expand below their row; modal sections launch
 * a dialog. Panel components keep their own state.
 */
const SmartCrawlSidebar = () => {
	const [activeTab, setActiveTab] = useState('seo');
	const [activeModal, setActiveModal] = useState('');
	const [readability, setReadability] = useState({});
	const [readabilityRequestLoading, setReadabilityRequestLoading] =
		useState(false);
	const [seoTabState, setSeoTabState] = useState({
		seo: {},
		loading: false,
		keywords: [],
	});

	const syncReadabilityForTab = useCallback(
		(nextReadability, nextLoading) => {
			setReadability(nextReadability || {});
			setReadabilityRequestLoading(!!nextLoading);
		},
		[]
	);

	const syncSeoForTab = useCallback((next) => {
		setSeoTabState(next || { seo: {}, loading: false, keywords: [] });
	}, []);

	const pluginTitle =
		ConfigValues.get('plugin_title', 'sidebar') ||
		__('SmartCrawl SEO', 'smartcrawl-seo');

	const showSeoIssueBadge =
		ConfigValues.get_bool('onpage_active', 'sidebar') ||
		ConfigValues.get_bool('seo_active', 'sidebar');

	const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost || {};

	const tabKeys = useMemo(() => SIDEBAR_TABS.map((t) => t.key), []);

	const modalTabLabels = useMemo(
		() =>
			SIDEBAR_TABS.reduce((labels, tab) => {
				labels[tab.key] = tab.label;
				return labels;
			}, {}),
		[]
	);

	const openTab = useCallback((tabKey) => {
		if (['social', 'advanced'].includes(tabKey)) {
			setActiveModal(tabKey);
			return;
		}

		setActiveTab((currentTab) => (currentTab === tabKey ? '' : tabKey));
	}, []);

	// Safety: if current activeTab is filtered out, fall back to first visible.
	useEffect(() => {
		if (activeTab && tabKeys.length && !tabKeys.includes(activeTab)) {
			setActiveTab(tabKeys[0]);
		}
	}, [tabKeys, activeTab]);

	if (!PluginSidebar || !PluginSidebarMoreMenuItem) {
		return null;
	}

	return (
		<>
			<SmartCrawlHeaderToggle title={pluginTitle} />

			<PluginSidebarMoreMenuItem
				target="wds-seo-sidebar"
				icon={<SmartCrawlIcon />}
			>
				{pluginTitle}
			</PluginSidebarMoreMenuItem>

			<PluginSidebar
				name="wds-seo-sidebar"
				title={pluginTitle}
				icon={<SmartCrawlIcon />}
			>
				<div className="wds-gutenberg-sidebar">
					<div
						className="wds-sidebar-accordion"
						aria-label={__('SmartCrawl sections', 'smartcrawl-seo')}
					>
						{SIDEBAR_TABS.map((tab) => {
							const opensModal = ['social', 'advanced'].includes(
								tab.key
							);
							const isOpen = activeTab === tab.key && !opensModal;

							return (
								<div
									key={tab.key}
									className={classnames(
										'wds-sidebar-accordion__item',
										{
											'is-open': isOpen,
										}
									)}
								>
									<button
										type="button"
										className="wds-sidebar-accordion__toggle"
										aria-expanded={
											opensModal ? undefined : isOpen
										}
										aria-haspopup={
											opensModal ? 'dialog' : undefined
										}
										id={'wds-sidebar-tab-' + tab.key}
										aria-controls={
											opensModal
												? `wds-sidebar-${tab.key}-modal`
												: 'wds-sidebar-tabpanel-' +
												  tab.key
										}
										onClick={() => openTab(tab.key)}
									>
										<span className="wds-sidebar-accordion__label">
											{tab.label}
										</span>
										{tab.key === 'seo' &&
											showSeoIssueBadge &&
											(() => {
												const {
													seo,
													loading,
													keywords,
												} = seoTabState;
												const errCnt =
													computeSeoTabIssueCount(
														seo,
														keywords
													);
												return (
													<span
														className={classnames({
															'wds-issues':
																loading ||
																errCnt <= 0,
															'wds-item-loading':
																loading,
															'wds-issues-success':
																!loading &&
																errCnt === 0,
															'sui-tag sui-tag-sm sui-tag-error wds-sidebar-issue-tag':
																!loading &&
																errCnt > 0,
															'wds-issues-invalid':
																!loading &&
																errCnt === -1,
														})}
													>
														{errCnt > 0 && (
															<span>
																{errCnt}{' '}
																{__(
																	'Errors',
																	'smartcrawl-seo'
																)}
															</span>
														)}
														{errCnt === -1 && (
															<span>0</span>
														)}
													</span>
												);
											})()}
										{tab.key === 'readability' &&
											(() => {
												// readability.loading if API adds it; else existing in-flight fetch flag.
												const loading =
													(readability?.loading ??
														false) ||
													readabilityRequestLoading;

												const errCnt =
													readability?.errors ??
													readability?.issueCount ??
													readability?.warnings ??
													(readability?.state ===
														'warning' ||
													readability?.state ===
														'error'
														? 1
														: readability?.state ===
														  'invalid'
														? -1
														: 0);

												return (
													<span
														className={classnames({
															'wds-issues':
																loading ||
																errCnt <= 0,
															'wds-item-loading':
																loading,
															'wds-issues-success':
																!loading &&
																errCnt === 0,
															'sui-tag sui-tag-sm sui-tag-error wds-sidebar-issue-tag':
																!loading &&
																errCnt > 0,
															'wds-issues-invalid':
																!loading &&
																errCnt === -1,
														})}
													>
														{errCnt > 0 && (
															<span>
																{errCnt}{' '}
																{__(
																	'Errors',
																	'smartcrawl-seo'
																)}
															</span>
														)}
														{errCnt === -1 && (
															<span>0</span>
														)}
													</span>
												);
											})()}
										{opensModal ? (
											<span
												className="sui-icon-more wds-sidebar-accordion__more"
												aria-hidden="true"
											/>
										) : (
											<span
												className="dashicons dashicons-arrow-down-alt2 wds-sidebar-accordion__chevron"
												aria-hidden="true"
											/>
										)}
									</button>

									{tab.key === 'seo' && isOpen && (
										<div
											className="wds-sidebar-tab-panel wds-sidebar-tab-panel--seo"
											id="wds-sidebar-tabpanel-seo"
											aria-labelledby="wds-sidebar-tab-seo"
										>
											<SeoPanel
												onSeoTabState={syncSeoForTab}
											/>
										</div>
									)}
									{tab.key === 'readability' && isOpen && (
										<div
											className="wds-readability-tab wds-sidebar-tab-panel wds-sidebar-tab-panel--readability"
											id="wds-sidebar-tabpanel-readability"
											aria-labelledby="wds-sidebar-tab-readability"
										>
											<ReadabilityPanel
												onReadabilityForTab={
													syncReadabilityForTab
												}
											/>
										</div>
									)}
									{tab.key === 'moz' && isOpen && (
										<MozPanel />
									)}
								</div>
							);
						})}
					</div>

					{!!activeModal &&
						renderSidebarModal(
							<Modal
								id={`wds-sidebar-${activeModal}-modal`}
								title={modalTabLabels[activeModal]}
								onClose={() => setActiveModal('')}
								focusAfterOpen={`wds-sidebar-${activeModal}-modal-close-button`}
								focusAfterClose={`wds-sidebar-tab-${activeModal}`}
								dialogClasses={{
									'wds-sidebar-tab-modal': true,
								}}
							>
								{activeModal === 'social' && <SocialPanel />}
								{activeModal === 'advanced' && (
									<AdvancedPanel />
								)}
							</Modal>
						)}
				</div>
			</PluginSidebar>
		</>
	);
};

export default SmartCrawlSidebar;
