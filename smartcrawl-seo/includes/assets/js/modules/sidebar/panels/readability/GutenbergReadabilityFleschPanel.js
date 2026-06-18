/**
 * Gutenberg sidebar: show the Flesch-Kincaid result as a status notice with
 * its supporting guidance available in a SUI modal.
 */
import { __ } from '@wordpress/i18n';
import wp from 'wp';
import classnames from 'classnames';
import Button from '../../../../components/button';
import Modal from '../../../../components/modal';
import { renderSidebarModal } from '../../utils/sidebar-portal';
import { SeoAssessmentStatusIcon } from '../seo/GutenbergSeoAnalysisCheckItemAccordion';

const { createElement, useState } = wp.element;

/** @jsx createElement */
/** @jsxFrag Fragment */

function iconVariantForReadability(state, ignored) {
	if (ignored) {
		return 'neutral';
	}
	if (state === 'success') {
		return 'success';
	}
	return 'warning';
}

export default function GutenbergReadabilityFleschPanel({
	state = '',
	ignored = false,
	level = '',
	onIgnore = () => false,
	onUnignore = () => false,
	children,
}) {
	const [modalOpen, setModalOpen] = useState(false);
	const iconVariant = iconVariantForReadability(state, ignored);

	const statusClass = classnames(
		'wds-check-item',
		'wds-seo-check-item',
		'wds-readability-flesch-item',
		ignored
			? 'wds-check-invalid disabled wds-seo-check-item--ignored'
			: state === 'success'
			? 'sui-success wds-check-success'
			: 'sui-warning wds-check-warning'
	);

	const title = (
		<div className="wds-readability-flesch-panel-title">
			<span className="wds-seo-check-panel-title">
				<SeoAssessmentStatusIcon variant={iconVariant} />
				<span className="wds-seo-check-panel-title-text">
					{__('Flesch-Kincaid Test', 'smartcrawl-seo')}
				</span>
			</span>
			{!ignored && !!level && (
				<span
					className={classnames(
						'wds-readability-flesch-panel-level-tag',
						'sui-tag',
						`sui-tag-${
							state === 'invalid' ? 'warning' : state || 'warning'
						}`
					)}
				>
					{level}
				</span>
			)}
		</div>
	);

	if (ignored) {
		return (
			<div
				id="wds-check-readability"
				className={classnames('wds-seo-check-item-wrap', statusClass)}
			>
				<div className="wds-seo-check-ignored-inner">
					<SeoAssessmentStatusIcon variant={iconVariant} />
					<span className="wds-seo-check-panel-title-text">
						{__('Flesch-Kincaid Test', 'smartcrawl-seo')}
					</span>
					<Button
						className="wds-unignore"
						color="ghost"
						icon="dashicons dashicons-undo"
						text={__('Restore', 'smartcrawl-seo')}
						onClick={onUnignore}
					></Button>
				</div>
			</div>
		);
	}

	return (
		<div
			id="wds-check-readability"
			className={classnames('wds-seo-check-item-wrap', statusClass)}
		>
			<div className="wds-readability-flesch-notice">{title}</div>
			<div className="wds-readability-flesch-actions">
				<Button
					id="wds-sidebar-readability-flesch-view-button"
					color="ghost"
					text={__('Read More', 'smartcrawl-seo')}
					onClick={() => setModalOpen(true)}
				/>
			</div>

			{!!modalOpen &&
				renderSidebarModal(
					<Modal
						id="wds-sidebar-readability-flesch-modal"
						title={__('Flesch-Kincaid Test', 'smartcrawl-seo')}
						onClose={() => setModalOpen(false)}
						focusAfterOpen="wds-sidebar-readability-flesch-modal-close-button"
						focusAfterClose="wds-sidebar-readability-flesch-view-button"
						dialogClasses={{
							'wds-sidebar-tab-modal': true,
							'wds-sidebar-readability-flesch-modal': true,
						}}
					>
						<div className="wds-sidebar-readability-scope">
							<div className="wds-readability-flesch-expanded">
								{children}
							</div>
						</div>
					</Modal>
				)}
		</div>
	);
}
