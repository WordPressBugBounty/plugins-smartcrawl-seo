import React from 'react';
import classnames from 'classnames';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import Button from '../../../components/button';
import MascotMessage from '../../../components/mascot-message';
import FocusKeywords from './focus-keywords';
import SeoAnalysisContent from './seo-analysis-content';
import Notice from '../../../components/notices/notice';
import ConfigValues from '../../../es6/config-values';

export default class SeoAnalysisContainer extends React.Component {
	static defaultProps = {
		keywords: [],
		onUpdateKeywords: () => false,
		analysis: {},
		loading: false,
		isRefreshing: false,
		onRefresh: () => false,
		useReactAccordion: false,
	};

	render() {
		const {
			keywords,
			analysis,
			loading,
			isRefreshing,
			onUpdateKeywords,
			onRefresh,
			useReactAccordion,
		} = this.props;

		const refreshDisabled = loading || isRefreshing;

		return (
			<div className="wds-seo-analysis-container">
				<div className="wds-seo-analysis-label">
					<label className="sui-label">
						{__('SEO Analysis', 'smartcrawl-seo')}
					</label>

					{useReactAccordion ? (
						<button
							type="button"
							className={classnames(
								'wds-refresh-button',
								'wds-refresh-analysis',
								'wds-analysis-seo',
								'sui-button',
								'sui-button-ghost',
								{
									'is-loading': isRefreshing || loading,
								}
							)}
							disabled={refreshDisabled}
							onClick={onRefresh}
							aria-busy={isRefreshing}
						>
							{isRefreshing ? (
								<span
									className="wds-spinner"
									aria-hidden="true"
								/>
							) : (
								<span
									className="wds-refresh-icon"
									aria-hidden="true"
								>
									<span className="sui-icon-update" />
								</span>
							)}
							{isRefreshing
								? __('Refreshing…', 'smartcrawl-seo')
								: __('Refresh', 'smartcrawl-seo')}
						</button>
					) : (
						<Button
							className="wds-refresh-analysis wds-analysis-seo"
							color="ghost"
							icon="sui-icon-update"
							text={__('Refresh', 'smartcrawl-seo')}
							loading={loading}
							onClick={onRefresh}
						/>
					)}
				</div>

				<div className="wds-seo-analysis-content">
					<MascotMessage
						msgKey="metabox-seo-analysis"
						message={createInterpolateElement(
							sprintf(
								// translators: %s: plugin title
								__(
									'This tool helps you optimize your content to give it the ' +
										'best chance of being found in search engines when people are ' +
										'looking for it. Start by choosing a few focus keyphrases ' +
										'that best describe your article, then <strong>%s</strong> will ' +
										'give you recommendations to make sure your content is highly optimized.',
									'wds'
								),
								ConfigValues.get('plugin_title', 'admin')
							),
							{ strong: <strong /> }
						)}
					/>
					<FocusKeywords
						keywords={keywords}
						onUpdateKeywords={onUpdateKeywords}
						loading={loading}
					/>

					{!!loading && (
						<Notice
							type={false}
							className="wds-analysis-working"
							loading={loading}
							message={__(
								'Analyzing content. Please wait a few moments.',
								'wds'
							)}
						/>
					)}

					{!loading && (
						<SeoAnalysisContent
							analysis={analysis}
							useReactAccordion={useReactAccordion}
						/>
					)}
				</div>
			</div>
		);
	}
}
