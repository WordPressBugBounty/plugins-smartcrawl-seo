/**
 * Advanced tab — placeholder until sidebar parity with metabox advanced.
 */
import wp from 'wp';
import { __ } from '@wordpress/i18n';
import ConfigValues from '../../../es6/config-values';
import SettingsRow from '../../../components/settings-row';
import Toggle from '../../../components/toggle';
import TextInputField from '../../../components/form-fields/text-input-field';
import useSeoMeta from '../hooks/useSeoMeta';

const { createElement } = wp.element;

/** @jsx createElement */

function normalizeBool(value) {
	if (value === true) return true;
	if (value === false) return false;
	if (value === 1 || value === '1') return true;
	if (value === 0 || value === '0') return false;
	if (value === 'true') return true;
	if (value === 'false') return false;
	return !!value;
}

function normalizeString(value) {
	if (value === null || value === undefined || value === false) {
		return '';
	}
	return String(value);
}

function normalizeRobotsAdv(value) {
	if (!value) {
		return [];
	}
	if (Array.isArray(value)) {
		return value.map((v) => String(v).trim()).filter(Boolean);
	}
	return String(value)
		.split(',')
		.map((v) => v.trim())
		.filter(Boolean);
}

function serializeRobotsAdv(values) {
	const allowed = ['noodp', 'noydir', 'noarchive', 'nosnippet'];
	const cleaned = (values || []).map((v) => String(v).trim()).filter(Boolean);

	const inAllowedOrder = allowed.filter((k) => cleaned.includes(k));
	return inAllowedOrder.join(',');
}

export default function AdvancedPanel() {
	const postTypeNoindexed = !!ConfigValues.get(
		['advanced', 'indexing', 'post_type_noindexed'],
		'sidebar'
	);
	const postTypeNofollowed = !!ConfigValues.get(
		['advanced', 'indexing', 'post_type_nofollowed'],
		'sidebar'
	);

	const redirectAvailable = !!ConfigValues.get(
		['advanced', 'redirect', 'available'],
		'sidebar'
	);
	const redirectHasPermission = !!ConfigValues.get(
		['advanced', 'redirect', 'has_permission'],
		'sidebar'
	);
	const showRedirect = redirectAvailable && redirectHasPermission;

	const autolinksAvailable = !!ConfigValues.get(
		['advanced', 'autolinks', 'available'],
		'sidebar'
	);

	const indexKey = postTypeNoindexed ? 'index' : 'noindex';
	const followKey = postTypeNofollowed ? 'follow' : 'nofollow';

	const {
		canonical,
		redirect,
		setCanonical,
		setRedirect,
		robotsNoindex,
		robotsNofollow,
		robotsIndex,
		robotsFollow,
		setRobotsNoindex,
		setRobotsNofollow,
		setRobotsIndex,
		setRobotsFollow,
		robotsAdv,
		setRobotsAdv,
		autolinksExclude,
		setAutolinksExclude,
	} = useSeoMeta();

	const canonicalValue = normalizeString(canonical);
	const redirectValue = normalizeString(redirect);

	const indexingChecked = postTypeNoindexed
		? normalizeBool(robotsIndex)
		: normalizeBool(robotsNoindex);
	const followChecked = postTypeNofollowed
		? normalizeBool(robotsFollow)
		: normalizeBool(robotsNofollow);

	const adv = normalizeRobotsAdv(robotsAdv);
	const noarchiveChecked = adv.includes('noarchive');
	const nosnippetChecked = adv.includes('nosnippet');

	const autolinksChecked = normalizeBool(autolinksExclude);

	const handleChangeIndexing = (nextChecked) => {
		if (postTypeNoindexed) {
			setRobotsIndex(!!nextChecked);
		} else {
			setRobotsNoindex(!!nextChecked);
		}
	};

	const handleChangeFollow = (nextChecked) => {
		if (postTypeNofollowed) {
			setRobotsFollow(!!nextChecked);
		} else {
			setRobotsNofollow(!!nextChecked);
		}
	};

	const handleToggleRobotsAdv = (key, nextChecked) => {
		const set = new Set(adv);
		if (nextChecked) {
			set.add(key);
		} else {
			set.delete(key);
		}
		setRobotsAdv(serializeRobotsAdv([...set]));
	};

	return (
		<div
			className="wds-sidebar-tab-panel wds-sidebar-tab-panel--advanced"
			role="tabpanel"
			id="wds-sidebar-tabpanel-advanced"
			aria-labelledby="wds-sidebar-tab-advanced"
		>
			<div className="wds_advanced">
				<div className="wds-metabox-section sui-box-body">
					<p>
						{__(
							'Configure the advanced settings for this post.',
							'wds'
						)}
					</p>

					<SettingsRow
						id="wds-advanced-indexing-row"
						label={__('Indexing', 'smartcrawl-seo')}
						description={__(
							'Choose how search engines will index this particular page.',
							'wds'
						)}
					>
						<div className="sui-form-field">
							<Toggle
								key={`wds_meta-robots-${indexKey}-${indexingChecked}`}
								id={`wds_meta-robots-${indexKey}`}
								name={`wds_meta-robots-${indexKey}`}
								label={
									postTypeNoindexed
										? __(
												'Index - Override Post Type Setting',
												'wds'
										  )
										: __('Index', 'smartcrawl-seo')
								}
								description=""
								checked={indexingChecked}
								inverted={!postTypeNoindexed}
								disabled={false}
								onChange={handleChangeIndexing}
							/>
							<span className="sui-description">
								{__(
									'Instruct search engines whether or not you want this post to appear in search results.',
									'wds'
								)}
							</span>
						</div>
						<div className="sui-form-field">
							<Toggle
								key={`wds_meta-robots-${followKey}-${followChecked}`}
								id={`wds_meta-robots-${followKey}`}
								name={`wds_meta-robots-${followKey}`}
								label={
									postTypeNofollowed
										? __(
												'Follow - Override Post Type Setting',
												'wds'
										  )
										: __('Follow', 'smartcrawl-seo')
								}
								description=""
								checked={followChecked}
								inverted={!postTypeNofollowed}
								disabled={false}
								onChange={handleChangeFollow}
							/>
							<span className="sui-description">
								{__(
									'Tells search engines whether or not to follow the links on your page and crawl them too.',
									'wds'
								)}
							</span>
						</div>
						<div className="sui-form-field">
							<Toggle
								key={`wds_meta-robots-noarchive-${noarchiveChecked}`}
								id="wds_meta-robots-noarchive"
								name="wds_meta-robots-adv[noarchive]"
								label={__('Archive', 'smartcrawl-seo')}
								description=""
								checked={noarchiveChecked}
								inverted={true}
								disabled={false}
								onChange={(next) =>
									handleToggleRobotsAdv('noarchive', next)
								}
							/>
							<span className="sui-description">
								{__(
									'Instructs search engines to store a cached version of this page.',
									'smartcrawl-seo'
								)}
							</span>
						</div>
						<div className="sui-form-field">
							<Toggle
								key={`wds_meta-robots-nosnippet-${nosnippetChecked}`}
								id="wds_meta-robots-nosnippet"
								name="wds_meta-robots-adv[nosnippet]"
								label={__('Snippet', 'smartcrawl-seo')}
								description=""
								checked={nosnippetChecked}
								inverted={true}
								disabled={false}
								onChange={(next) =>
									handleToggleRobotsAdv('nosnippet', next)
								}
							/>
							<span className="sui-description">
								{__(
									'Allows search engines to show a snippet of this page in the search results and prevents them from caching the page.',
									'smartcrawl-seo'
								)}
							</span>
						</div>
					</SettingsRow>

					<SettingsRow
						label={__('Canonical', 'smartcrawl-seo')}
						description={__(
							'If you have several similar versions of this page you can point search engines to the canonical or "genuine" version to avoid duplicate content issues.',
							'wds'
						)}
					>
						<TextInputField
							id="wds_canonical"
							name="wds_canonical"
							description={__(
								'Enter the full canonical URL including http:// or https://',
								'wds'
							)}
							value={canonicalValue}
							disabled={false}
							onChange={setCanonical}
						/>
					</SettingsRow>

					{showRedirect && (
						<SettingsRow
							label={__('301 Redirect', 'smartcrawl-seo')}
							description={__(
								'Send visitors to this URL to another page.',
								'smartcrawl-seo'
							)}
						>
							<TextInputField
								id="wds_redirect"
								name="wds_redirect"
								description={__(
									'Enter the URL to send traffic to including http:// or https://',
									'wds'
								)}
								value={redirectValue}
								disabled={false}
								onChange={setRedirect}
							/>
						</SettingsRow>
					)}

					{autolinksAvailable && (
						<SettingsRow
							label={__('Automatic Linking', 'smartcrawl-seo')}
							description={__(
								'You can prevent this particular post from being auto-linked.',
								'smartcrawl-seo'
							)}
						>
							<div className="sui-form-field">
								<Toggle
									key={`wds_autolinks-exclude-${autolinksChecked}`}
									name="wds_autolinks-exclude"
									label={__(
										'Enable automatic linking for this post',
										'smartcrawl-seo'
									)}
									description=""
									fullWidth={true}
									checked={autolinksChecked}
									inverted={true}
									disabled={false}
									onChange={(next) =>
										setAutolinksExclude(!!next)
									}
								/>
								<span className="sui-description">
									{__(
										'Turn this off to prevent this post from being auto-linked.',
										'smartcrawl-seo'
									)}
								</span>
							</div>
						</SettingsRow>
					)}
				</div>
			</div>
		</div>
	);
}
