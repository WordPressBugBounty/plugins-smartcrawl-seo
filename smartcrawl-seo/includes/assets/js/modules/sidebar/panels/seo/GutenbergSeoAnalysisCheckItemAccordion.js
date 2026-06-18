/**
 * Gutenberg sidebar: each SEO assessment uses wp.components.PanelBody — the same
 * core accordion as the former “SEO” tab (components-panel__body-toggle + chevron).
 * No SUI “Expand item” button / AccordionItemOpenIndicator.
 */
import { __ } from '@wordpress/i18n';
import wp from 'wp';
import classnames from 'classnames';
import Button from '../../../../components/button';

const { createElement, Fragment } = wp.element;
const { PanelBody } = wp.components;

/** @jsx createElement */
/** @jsxFrag Fragment */

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Production-style status marks: white “i” on yellow/gray disks, white check on teal.
 * Inline SVG keeps shape consistent with the classic metabox (vs SUI icon font scaling).
 */
export function SeoAssessmentStatusIcon({ variant }) {
	const svgClass = 'wds-seo-check-title-icon-svg';

	if (variant === 'success') {
		return createElement(
			'span',
			{ className: 'wds-seo-check-title-icon', 'aria-hidden': true },
			createElement(
				'svg',
				{
					className: svgClass,
					xmlns: SVG_NS,
					viewBox: '0 0 16 16',
					focusable: 'false',
				},
				createElement('path', {
					fill: 'none',
					stroke: 'currentColor',
					strokeWidth: 2.75,
					strokeLinecap: 'round',
					strokeLinejoin: 'round',
					d: 'M3.5 8.2l2.8 2.8L12.5 4',
				})
			)
		);
	}

	return createElement(
		'span',
		{ className: 'wds-seo-check-title-icon', 'aria-hidden': true },
		createElement(
			'svg',
			{
				className: svgClass,
				xmlns: SVG_NS,
				viewBox: '0 0 16 16',
				focusable: 'false',
			},
			createElement('circle', {
				cx: 8,
				cy: 5.2,
				r: 1.55,
				fill: 'currentColor',
			}),
			createElement('rect', {
				x: 6.95,
				y: 7.25,
				width: 2.1,
				height: 6.25,
				rx: 1.05,
				fill: 'currentColor',
			})
		)
	);
}

export default function GutenbergSeoAnalysisCheckItemAccordion({
	id = '',
	status = false,
	ignored = false,
	recommendation = [],
	statusMsg = '',
	moreInfo = '',
	onIgnore = () => false,
	onUnignore = () => false,
}) {
	const iconVariant =
		ignored || (id === 'title-secondary-keywords' && !status)
			? 'neutral'
			: status
			? 'success'
			: 'warning';

	const statusClass = classnames(
		'wds-check-item',
		'wds-seo-check-item',
		ignored
			? 'wds-check-invalid disabled wds-seo-check-item--ignored'
			: id === 'title-secondary-keywords' && !status
			? ''
			: status
			? 'sui-success wds-check-success'
			: 'sui-warning wds-check-warning'
	);

	const title = (
		<span className="wds-seo-check-panel-title">
			<SeoAssessmentStatusIcon variant={iconVariant} />
			<span className="wds-seo-check-panel-title-text">{statusMsg}</span>
		</span>
	);

	if (ignored) {
		return (
			<div
				id={'wds-check-' + id}
				className={classnames('wds-seo-check-item-wrap', statusClass)}
			>
				<div className="wds-seo-check-ignored-inner">
					<SeoAssessmentStatusIcon variant={iconVariant} />
					<span className="wds-seo-check-panel-title-text">
						{statusMsg}
					</span>
					<Button
						id={'wds-unignore-check-' + id}
						className="wds-unignore"
						color="ghost"
						icon="dashicons dashicons-undo"
						text={__('Restore', 'smartcrawl-seo')}
						onClick={onUnignore}
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			id={'wds-check-' + id}
			className={classnames('wds-seo-check-item-wrap', statusClass)}
		>
			<PanelBody title={title} initialOpen={false}>
				<div className="wds-seo-check-panel-expanded">
					<div className="wds-recommendation">
						<strong>{__('Recommendation', 'smartcrawl-seo')}</strong>
						{recommendation}
					</div>
					<div className="wds-more-info">
						<strong>{__('More Info', 'smartcrawl-seo')}</strong>
						{moreInfo}
					</div>

					<div className="wds-ignore-container">
						<Button
							className={classnames('wds-ignore')}
							color="ghost"
							icon="dashicons dashicons-hidden"
							text={__('Ignore', 'smartcrawl-seo')}
							onClick={onIgnore}
						/>
					</div>
				</div>
			</PanelBody>
		</div>
	);
}
