/**
 * Social tab — Phase A (static UI skeleton).
 *
 * Phase D: toggle + title/description are now writable via core/editor meta.
 *
 * Important: image handling remains read-only until Phase E.
 */
import wp from 'wp';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import ConfigValues from '../../../es6/config-values';
import useSeoMeta from '../hooks/useSeoMeta';

const { createElement, useMemo, useRef } = wp.element;
const { useSelect } = wp.data;

/** @jsx createElement */

function addTabParam(url, tab) {
	if (!url) {
		return '';
	}
	const sep = url.includes('?') ? '&' : '?';
	return `${url}${sep}tab=${encodeURIComponent(tab)}`;
}

function NoticeInfo({ message }) {
	return (
		<div className="wds-notice sui-notice sui-notice-info">
			<div className="sui-notice-content">
				<div className="sui-notice-message">
					<span
						className="sui-notice-icon sui-icon-info sui-md"
						aria-hidden="true"
					/>
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
}

function normalizeImageIds(value, isSingle) {
	const arr = Array.isArray(value) ? value : [];
	const ids = arr
		.map((v) => (typeof v === 'string' ? parseInt(v, 10) : v))
		.filter((v) => Number.isInteger(v) && v > 0);
	if (isSingle) {
		return ids.length ? [ids[0]] : [];
	}
	// De-dupe while preserving order.
	return [...new Set(ids)];
}

function useMediaUrls(ids) {
	const idsKey = useMemo(() => (ids || []).join(','), [ids]);

	// Use Gutenberg core data store for caching + resolver batching.
	// This avoids manual per-ID REST calls and reuses shared media cache.
	return useSelect(
		(select) => {
			const core = select('core');
			const map = {};
			(ids || []).forEach((id) => {
				const m = core?.getMedia ? core.getMedia(id) : null;
				map[id] =
					m?.media_details?.sizes?.thumbnail?.source_url ||
					m?.media_details?.sizes?.medium?.source_url ||
					m?.source_url ||
					'';
			});
			return map;
		},
		// idsKey is a stable dependency for the selector
		[idsKey]
	);
}

function SocialSectionSkeleton({
	type,
	label,
	description,
	isSingle,
	disabledValue,
	titleValue,
	descValue,
	images,
	titlePlaceholder,
	descPlaceholder,
	onChangeDisabled,
	onChangeTitle,
	onChangeDescription,
	onAddImages,
	onRemoveImage,
}) {
	const fieldName = `wds-${type}`;
	const imageIds = normalizeImageIds(images, isSingle);
	const urlById = useMediaUrls(imageIds);
	const isDisabled = !!disabledValue;
	const frameRef = useRef(null);

	function openMediaFrame(e) {
		e.preventDefault();
		if (!wp.media) {
			return;
		}

		if (!frameRef.current) {
			frameRef.current = wp.media({
				multiple: !isSingle,
				library: { type: 'image' },
			});
		}

		frameRef.current.off('select');
		frameRef.current.on('select', () => {
			const selection = frameRef.current.state().get('selection');
			const selected = [];
			if (selection) {
				selection.each((model) => {
					const id = model?.get ? model.get('id') : null;
					if (id) {
						selected.push(id);
					}
				});
			}
			onAddImages?.(selected);
		});

		frameRef.current.open();
	}

	return (
		<div className="sui-box-settings-row">
			<div className="sui-box-settings-col-1">
				<span className="sui-settings-label">{label}</span>
				<span className="sui-description">{description}</span>
			</div>
			<div className="sui-box-settings-col-2">
				<label className="sui-toggle sui-toggle-inverted sui-toggle-full">
					<input
						type="checkbox"
						id={`${fieldName}-disabled`}
						name={`${fieldName}[disabled]`}
						checked={isDisabled}
						onChange={(e) => onChangeDisabled?.(e.target.checked)}
					/>
					<span className="sui-toggle-slider" aria-hidden="true" />
					<span className="sui-toggle-label">
						{__('Enable for this post', 'smartcrawl-seo')}
					</span>
				</label>

				{!isDisabled && (
					<div
						className="sui-toggle-content sui-border-frame"
						aria-label={sprintf(
							/* translators: %s: section label */
							__("Children of '%s'", 'wds-texdomain'),
							label
						)}
					>
						<div className="sui-form-field">
							<label
								htmlFor={`${fieldName}-title`}
								className="sui-label"
							>
								{__('Title', 'smartcrawl-seo')}
							</label>
							<input
								type="text"
								className="sui-form-control"
								id={`${fieldName}-title`}
								name={`${fieldName}[title]`}
								placeholder={titlePlaceholder || ''}
								value={titleValue || ''}
								onChange={(e) =>
									onChangeTitle?.(e.target.value)
								}
							/>
						</div>

						<div className="sui-form-field">
							<label
								htmlFor={`${fieldName}-description`}
								className="sui-label"
							>
								{__('Description', 'smartcrawl-seo')}
							</label>
							<textarea
								name={`${fieldName}[description]`}
								className="sui-form-control"
								placeholder={descPlaceholder || ''}
								id={`${fieldName}-description`}
								value={descValue || ''}
								onChange={(e) =>
									onChangeDescription?.(e.target.value)
								}
							/>
						</div>

						<div className="sui-form-field">
							<label
								htmlFor={`${fieldName}-images`}
								className="sui-label"
							>
								{isSingle
									? __('Featured Image', 'smartcrawl-seo')
									: __('Featured Images', 'smartcrawl-seo')}
							</label>
							<div className="og-images">
								<div
									className="add-action-wrapper sui-tooltip"
									data-tooltip={__(
										'Add featured image',
										'smartcrawl-seo'
									)}
									style={
										isSingle && imageIds.length
											? { display: 'none' }
											: undefined
									}
								>
									<a
										href="#"
										id={`${fieldName}-images`}
										title={__(
											'Add image',
											'smartcrawl-seo'
										)}
										onClick={openMediaFrame}
									>
										<span
											className="sui-icon-upload-cloud"
											aria-hidden="true"
										/>
									</a>
								</div>
								{!!imageIds.length &&
									imageIds.map((id, idx) => (
										<div
											key={`${id}-${idx}`}
											className="og-image item"
										>
											{urlById[id] ? (
												<img
													src={urlById[id]}
													alt={sprintf(
														/* translators: %d: image id */
														__(
															'Image %d',
															'smartcrawl-seo'
														),
														id
													)}
												/>
											) : (
												<div className="sui-description">
													{sprintf(
														/* translators: %d: attachment id */
														__(
															'Image ID: %d',
															'smartcrawl-seo'
														),
														id
													)}
												</div>
											)}
											<button
												type="button"
												className="remove-action"
												onClick={() =>
													onRemoveImage?.(id)
												}
											>
												<span
													className="sui-icon-close"
													aria-hidden="true"
												/>
											</button>
										</div>
									))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default function SocialPanel() {
	const { opengraph, setOpengraph, twitter, setTwitter } = useSeoMeta();

	const og = opengraph || {};
	const tw = twitter || {};

	const socialSettingsUrl = ConfigValues.get(
		['social', 'settings_url'],
		'sidebar'
	);
	const socialTabAllowed = ConfigValues.get_bool(
		['social', 'tab_allowed'],
		'sidebar'
	);

	const ogEnabledGlobally = ConfigValues.get_bool(
		['social', 'opengraph', 'enabled_globally'],
		'sidebar'
	);
	const twEnabledGlobally = ConfigValues.get_bool(
		['social', 'twitter', 'enabled_globally'],
		'sidebar'
	);

	const ogTitlePlaceholder = ConfigValues.get(
		['social', 'opengraph', 'title_placeholder'],
		'sidebar'
	);
	const ogDescPlaceholder = ConfigValues.get(
		['social', 'opengraph', 'desc_placeholder'],
		'sidebar'
	);
	const twTitlePlaceholder = ConfigValues.get(
		['social', 'twitter', 'title_placeholder'],
		'sidebar'
	);
	const twDescPlaceholder = ConfigValues.get(
		['social', 'twitter', 'desc_placeholder'],
		'sidebar'
	);

	const pluginTitle =
		ConfigValues.get('plugin_title', 'sidebar') ||
		__('SmartCrawl SEO', 'smartcrawl-seo');

	const tagOnpageUrl = ConfigValues.get('tab_onpage_url', 'sidebar');

	return (
		<div
			className="wds-sidebar-tab-panel wds-sidebar-tab-panel--social"
			role="tabpanel"
			id="wds-sidebar-tabpanel-social"
			aria-labelledby="wds-sidebar-tab-social"
		>
			<div className="wds_social">
				<p>
					{tagOnpageUrl
						? createInterpolateElement(
								sprintf(
									// translators: %s: plugin title
									__(
										"Customize this post's title, description and featured images for social shares. You can also configure the default settings for this post type in <strong>%s</strong>'s <a>Titles & Meta</a> area.",
										'wds'
									),
									pluginTitle
								),
								{
									a: <a href={tagOnpageUrl} />,
									strong: <strong />,
								}
						  )
						: __(
								"Customize this post's title, description and featured images for social shares.",
								'smartcrawl-seo'
						  )}
				</p>

				{!ogEnabledGlobally && (
					<div className="sui-box-settings-row">
						<div className="sui-box-settings-col-1">
							<span className="sui-settings-label">
								{__('OpenGraph', 'smartcrawl-seo')}
							</span>
							<span className="sui-description">
								{__(
									'OpenGraph is used on many social networks such as Facebook.',
									'smartcrawl-seo'
								)}
							</span>
						</div>
						<div className="sui-box-settings-col-2">
							<NoticeInfo
								message={
									socialTabAllowed && socialSettingsUrl
										? createInterpolateElement(
												__(
													'OpenGraph is globally disabled. You can enable it <a>here</a>.',
													'smartcrawl-seo'
												),
												{
													a: (
														<a
															href={addTabParam(
																socialSettingsUrl,
																'tab_open_graph'
															)}
														/>
													),
												}
										  )
										: __(
												'OpenGraph is globally disabled.',
												'smartcrawl-seo'
										  )
								}
							/>
						</div>
					</div>
				)}

				{ogEnabledGlobally && (
					<SocialSectionSkeleton
						type="opengraph"
						label={__('OpenGraph', 'smartcrawl-seo')}
						description={__(
							'OpenGraph is used on many social networks such as Facebook.',
							'smartcrawl-seo'
						)}
						isSingle={false}
						disabledValue={og.disabled}
						titleValue={og.title}
						descValue={og.description}
						images={og.images}
						titlePlaceholder={ogTitlePlaceholder}
						descPlaceholder={ogDescPlaceholder}
						onChangeDisabled={(nextDisabled) => {
							setOpengraph({
								...(og || {}),
								disabled: !!nextDisabled,
								images: normalizeImageIds(og.images, false),
							});
						}}
						onChangeTitle={(nextTitle) => {
							setOpengraph({
								...(og || {}),
								title: nextTitle,
								images: normalizeImageIds(og.images, false),
							});
						}}
						onChangeDescription={(nextDesc) => {
							setOpengraph({
								...(og || {}),
								description: nextDesc,
								images: normalizeImageIds(og.images, false),
							});
						}}
						onAddImages={(selectedIds) => {
							const current = normalizeImageIds(og.images, false);
							const next = normalizeImageIds(
								[...current, ...(selectedIds || [])],
								false
							);
							setOpengraph({
								...(og || {}),
								images: next,
							});
						}}
						onRemoveImage={(removeId) => {
							const current = normalizeImageIds(og.images, false);
							const next = current.filter(
								(id) => id !== removeId
							);
							setOpengraph({
								...(og || {}),
								images: next,
							});
						}}
					/>
				)}

				{!twEnabledGlobally && (
					<div className="sui-box-settings-row">
						<div className="sui-box-settings-col-1">
							<span className="sui-settings-label">
								{__('X', 'smartcrawl-seo')}
							</span>
							<span className="sui-description">
								{__(
									'These details will be used in X cards.',
									'smartcrawl-seo'
								)}
							</span>
						</div>
						<div className="sui-box-settings-col-2">
							<NoticeInfo
								message={
									socialTabAllowed && socialSettingsUrl
										? createInterpolateElement(
												__(
													'X Cards are globally disabled. You can enable them <a>here</a>.',
													'smartcrawl-seo'
												),
												{
													a: (
														<a
															href={addTabParam(
																socialSettingsUrl,
																'tab_x_cards'
															)}
														/>
													),
												}
										  )
										: __(
												'X Cards are globally disabled.',
												'smartcrawl-seo'
										  )
								}
							/>
						</div>
					</div>
				)}

				{twEnabledGlobally && (
					<SocialSectionSkeleton
						type="twitter"
						label={__('X', 'smartcrawl-seo')}
						description={__(
							'These details will be used in X cards.',
							'smartcrawl-seo'
						)}
						isSingle={true}
						disabledValue={tw.disabled}
						titleValue={tw.title}
						descValue={tw.description}
						images={tw.images}
						titlePlaceholder={twTitlePlaceholder}
						descPlaceholder={twDescPlaceholder}
						onChangeDisabled={(nextDisabled) => {
							setTwitter({
								...(tw || {}),
								disabled: !!nextDisabled,
								images: normalizeImageIds(tw.images, true),
							});
						}}
						onChangeTitle={(nextTitle) => {
							setTwitter({
								...(tw || {}),
								title: nextTitle,
								images: normalizeImageIds(tw.images, true),
							});
						}}
						onChangeDescription={(nextDesc) => {
							setTwitter({
								...(tw || {}),
								description: nextDesc,
								images: normalizeImageIds(tw.images, true),
							});
						}}
						onAddImages={(selectedIds) => {
							const next = normalizeImageIds(
								selectedIds || [],
								true
							);
							setTwitter({
								...(tw || {}),
								images: next,
							});
						}}
						onRemoveImage={() => {
							setTwitter({
								...(tw || {}),
								images: [],
							});
						}}
					/>
				)}
			</div>
		</div>
	);
}
