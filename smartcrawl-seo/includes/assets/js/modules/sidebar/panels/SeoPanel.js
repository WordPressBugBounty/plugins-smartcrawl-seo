/**
 * SeoPanel — SEO tab in the Gutenberg sidebar (React hooks).
 *
 * “SEO” is a static section title (no collapse). Each assessment uses wp.components.PanelBody
 * (same accordion control as the former SEO tab). Metabox-like stripe styling is in wds-sidebar.scss.
 *
 * Mirrors the classic metabox SEO slice: Google preview + analysis refresh,
 * focus keywords, and ignore/restore (handled inside SeoAnalysisTabContent).
 *
 * State
 * ─────
 * - Preview title/description: local state updated when SidebarGooglePreview
 *   resolves macros (same as Metabox). Raw SEO title/description live in
 *   core/editor meta only (useSeoMeta), not duplicated in this panel.
 * - Keywords: local array synced from useSeoMeta.focusKeywords; updated when
 *   FocusKeywords saves so analysis can re-run before the next store tick.
 * - seo / loading: analysis AJAX response (wds_analysis_get_editor_analysis).
 *
 * Effects
 * ───────
 * - On mount: run analysis once (replaces unreliable window "load" listener).
 * - GutenbergEditor "autosave" event: re-fetch analysis with is_dirty=1 when
 *   the post is saved/autosaved (same middleware as classic Gutenberg path).
 */
import wp from 'wp';
import { __ } from '@wordpress/i18n';
import ConfigValues from '../../../es6/config-values';
import GutenbergEditor from '../../../es6/gutenberg-editor';
import RequestUtil from '../../../utils/request-util';
import useSeoMeta from '../hooks/useSeoMeta';
import SidebarGooglePreview from './seo/SidebarGooglePreview';
import SeoAnalysisContainer from '../../metabox/seo/seo-analysis-container';
import Button from '../../../components/button';
import Modal from '../../../components/modal';
import { renderSidebarModal } from '../utils/sidebar-portal';

const { useState, useEffect, useRef, useCallback, createElement } = wp.element;

/** @jsx createElement */
/** @jsxFrag Fragment */

function splitFocusKeywords(commaString) {
	return (commaString || '')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
}

function SeoPanelCore({
	seoTitle,
	onSaveTitle,
	seoDesc,
	onSaveDesc,
	focusKeywords,
	onSaveKeywords,
	isOnpageActive,
	isSeoActive,
	onSeoTabState,
}) {
	const editorRef = useRef(null);
	if (!editorRef.current) {
		editorRef.current = new GutenbergEditor();
	}

	const [loading, setLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [previewTitle, setPreviewTitle] = useState('');
	const [previewDesc, setPreviewDesc] = useState('');
	const [keywords, setKeywords] = useState(() =>
		splitFocusKeywords(focusKeywords)
	);
	const [seo, setSeo] = useState({});
	const [analysisModalOpen, setAnalysisModalOpen] = useState(false);

	const latestRef = useRef({});
	const pendingRefreshButtonRef = useRef(false);
	latestRef.current = {
		previewTitle,
		previewDesc,
		keywords,
	};

	const runRefresh = useCallback((dirty, keywordOverride) => {
		const editor = editorRef.current;
		if (!editor) {
			if (pendingRefreshButtonRef.current) {
				pendingRefreshButtonRef.current = false;
				setIsRefreshing(false);
			}
			return;
		}
		const snap = latestRef.current;
		const kws =
			keywordOverride !== undefined ? keywordOverride : snap.keywords;

		setLoading(true);
		RequestUtil.post(
			'wds_analysis_get_editor_analysis',
			ConfigValues.get('nonce', 'metabox'),
			{
				post_id: editor.get_data().get_id(),
				is_dirty: dirty || editor.is_post_dirty() ? 1 : 0,
				wds_title: snap.previewTitle,
				wds_description: snap.previewDesc,
				wds_focus_keywords: kws.join(','),
			}
		)
			.then((resp) => {
				setSeo(resp?.seo || {});
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			})
			.finally(() => {
				if (pendingRefreshButtonRef.current) {
					pendingRefreshButtonRef.current = false;
					setIsRefreshing(false);
				}
			});
	}, []);

	useEffect(() => {
		setKeywords(splitFocusKeywords(focusKeywords));
	}, [focusKeywords]);

	useEffect(() => {
		runRefresh(false);
	}, [runRefresh]);

	useEffect(() => {
		const editor = editorRef.current;
		if (!editor || typeof editor.addEventListener !== 'function') {
			return undefined;
		}
		const onAutosave = () => runRefresh(true);
		editor.addEventListener('autosave', onAutosave);
		return () => {
			if (typeof editor.removeEventListener === 'function') {
				editor.removeEventListener('autosave', onAutosave);
			}
			if (typeof editor.destroy === 'function') {
				editor.destroy();
			}
			editorRef.current = null;
		};
	}, [runRefresh]);

	useEffect(() => {
		if (typeof onSeoTabState === 'function') {
			onSeoTabState({ seo, loading, keywords });
		}
	}, [seo, loading, keywords, onSeoTabState]);

	const handleUpdateKeywords = useCallback(
		(kws) => {
			setKeywords(kws);
			latestRef.current = {
				...latestRef.current,
				keywords: kws,
			};
			onSaveKeywords(kws.join(','));
			runRefresh(false, kws);
		},
		[onSaveKeywords, runRefresh]
	);

	const handleRefresh = useCallback(() => {
		if (isRefreshing || loading) {
			return;
		}
		pendingRefreshButtonRef.current = true;
		setIsRefreshing(true);
		try {
			editorRef.current?.autosave?.();
		} catch (e) {
			console.error('Autosave failed during refresh', e);
		}
		runRefresh(true);
	}, [isRefreshing, loading]);

	return (
		<div className="wds-seo-sidebar-panel">
			{isOnpageActive && (
				<div className="wds-metabox-section">
					<SidebarGooglePreview
						seoTitle={seoTitle}
						onSaveTitle={onSaveTitle}
						seoDesc={seoDesc}
						onSaveDesc={onSaveDesc}
						previewTitle={previewTitle}
						previewDesc={previewDesc}
						onChangeTitle={setPreviewTitle}
						onChangeDesc={setPreviewDesc}
					/>
				</div>
			)}

			{isSeoActive && (
				<div
					className={`wds-metabox-section${
						isOnpageActive
							? ' wds-sidebar-seo-analysis-section'
							: ''
					}`}
				>
					<div className="wds-sidebar-modal-launch">
						<label className="sui-label">
							{__('SEO Analysis', 'smartcrawl-seo')}
						</label>
						<p className="wds-preview-description wds-sidebar-modal-launch__description">
							{__(
								'Review focus keyphrases and SEO checks for this post.',
								'smartcrawl-seo'
							)}
						</p>
						<Button
							id="wds-sidebar-seo-analysis-view-button"
							color="ghost"
							text={__('View', 'smartcrawl-seo')}
							onClick={() => setAnalysisModalOpen(true)}
						/>
					</div>

					{!!analysisModalOpen &&
						renderSidebarModal(
							<Modal
								id="wds-sidebar-seo-analysis-modal"
								title={__('SEO Analysis', 'smartcrawl-seo')}
								onClose={() => setAnalysisModalOpen(false)}
								focusAfterOpen="wds-sidebar-seo-analysis-modal-close-button"
								focusAfterClose="wds-sidebar-seo-analysis-view-button"
								dialogClasses={{
									'wds-sidebar-tab-modal': true,
									'wds-sidebar-seo-analysis-modal': true,
								}}
							>
								<SeoAnalysisContainer
									keywords={keywords}
									onUpdateKeywords={handleUpdateKeywords}
									analysis={seo}
									loading={loading}
									isRefreshing={isRefreshing}
									onRefresh={handleRefresh}
									useReactAccordion={true}
								/>
							</Modal>
						)}
				</div>
			)}
		</div>
	);
}

const SeoPanel = ({ onSeoTabState }) => {
	const {
		seoTitle,
		setSeoTitle,
		seoDesc,
		setSeoDesc,
		focusKeywords,
		setFocusKeywords,
	} = useSeoMeta();

	const isOnpageActive = ConfigValues.get_bool('onpage_active', 'sidebar');
	const isSeoActive = ConfigValues.get_bool('seo_active', 'sidebar');

	if (!isOnpageActive && !isSeoActive) {
		return null;
	}

	return (
		<SeoPanelCore
			seoTitle={seoTitle}
			onSaveTitle={setSeoTitle}
			seoDesc={seoDesc}
			onSaveDesc={setSeoDesc}
			focusKeywords={focusKeywords}
			onSaveKeywords={setFocusKeywords}
			isOnpageActive={isOnpageActive}
			isSeoActive={isSeoActive}
			onSeoTabState={onSeoTabState}
		/>
	);
};

export default SeoPanel;
