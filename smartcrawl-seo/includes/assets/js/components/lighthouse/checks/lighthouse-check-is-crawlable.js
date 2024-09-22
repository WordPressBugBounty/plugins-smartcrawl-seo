import React from 'react';
import LighthouseCheckItem from '../lighthouse-check-item';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import Notice from '../../notices/notice';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseTable from '../tables/lighthouse-table';
import Button from '../../button';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckIsCrawlable extends React.Component {
	static defaultProps = {
		id: 'is-crawlable',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__(
					"Page isn't blocked from indexing",
					'smartcrawl-seo'
				)}
				failureTitle={__(
					'Page is blocked from indexing',
					'smartcrawl-seo'
				)}
				successDescription={this.successDescription()}
				failureDescription={this.failureDescription()}
				copyDescription={() => this.copyDescription()}
				actionButton={this.getActionButton()}
			/>
		);
	}

	commonDescription() {
		return (
			<React.Fragment>
				<div className="wds-lh-section">
					<strong>{__('Overview', 'smartcrawl-seo')}</strong>
					<p>
						{__(
							"Search engines can only show pages in their search results if those pages don't explicitly block indexing by search engine crawlers. Some HTTP headers and meta tags tell crawlers that a page shouldn't be indexed.",
							'smartcrawl-seo'
						)}
					</p>
					<p>
						{__(
							"Only block indexing for content that you don't want to appear in search results.",
							'smartcrawl-seo'
						)}
					</p>
				</div>
			</React.Fragment>
		);
	}

	successDescription() {
		return (
			<React.Fragment>
				{this.commonDescription()}
				<div className="wds-lh-section">
					<strong>{__('Status', 'smartcrawl-seo')}</strong>
					<Notice
						type="success"
						icon="sui-icon-info"
						message={__('Page is crawlable', 'smartcrawl-seo')}
					/>
				</div>
			</React.Fragment>
		);
	}

	failureDescription() {
		return (
			<React.Fragment>
				{this.commonDescription()}
				<div className="wds-lh-section">
					<strong>{__('Status', 'smartcrawl-seo')}</strong>
					<Notice
						type="warning"
						icon="sui-icon-info"
						message={this.getWarningMessage()}
					/>

					{this.renderTable()}
				</div>

				{(!LighthouseUtil.isBlogPublic() ||
					LighthouseUtil.isHomeNoindex()) && (
					<div className="wds-lh-section">
						<strong>
							{__(
								'How to ensure search engines can crawl your page',
								'smartcrawl-seo'
							)}
						</strong>

						{!LighthouseUtil.isBlogPublic() &&
							this.printSearchEngineVisibilityFix()}
						{LighthouseUtil.isBlogPublic() &&
							LighthouseUtil.isHomeNoindex() &&
							this.printScTitleAndMetaFix()}
					</div>
				)}
			</React.Fragment>
		);
	}

	getWarningMessage() {
		if (!LighthouseUtil.isBlogPublic()) {
			return createInterpolateElement(
				__(
					'Your WordPress Settings are currently to <strong>Discourage search engines from indexing</strong> this site.',
					'smartcrawl-seo'
				),
				{ strong: <strong /> }
			);
		} else if (LighthouseUtil.isHomeNoindex()) {
			return createInterpolateElement(
				sprintf(
					// translators: %s: plugin title
					__(
						'Your <strong>%s</strong> Settings are currently set to <strong>No Index</strong>.',
						'smartcrawl-seo'
					),
					ConfigValues.get('plugin_title', 'admin')
				),
				{
					strong: <strong />,
				}
			);
		}
		return __('Page is not crawlable', 'smartcrawl-seo');
	}

	printScTitleAndMetaFix() {
		return (
			<React.Fragment>
				<p>
					{createInterpolateElement(
						sprintf(
							// translators: %s: plugin title
							__(
								'Go to <strong>%s > Titles & Meta</strong> and enable the indexing option for your Homepage. Indexing enables you to configure how you want your website to appear in search results.',
								'smartcrawl-seo'
							),
							ConfigValues.get('plugin_title', 'admin')
						),
						{ strong: <strong /> }
					)}
				</p>
			</React.Fragment>
		);
	}

	printSearchEngineVisibilityFix() {
		return (
			<React.Fragment>
				<p>
					{__(
						'Preventing search engine bots from indexing your site is generally not recommended. However, if this is intentional (you’re still in development) you can ignore this recommendation.',
						'smartcrawl-seo'
					)}
				</p>
				<p>
					{createInterpolateElement(
						__(
							'In the <strong>WordPress Settings</strong> area, the <strong>Reading tab</strong> has a checkbox labelled Search Engine Visibility. Make sure the checkbox is not selected and click Save Changes. If this warning is still displaying after running another audit, it’s likely the <meta> tag has been hardcoded to your theme files, or is being output from another plugin. Contact your web developer to take a look and fix up the issue.',
							'smartcrawl-seo'
						),
						{ strong: <strong /> }
					)}
				</p>
			</React.Fragment>
		);
	}

	renderTable() {
		return (
			<LighthouseTable
				id={this.props.id}
				header={[__('Blocking Directive Source', 'smartcrawl-seo')]}
				rows={this.getRows()}
			/>
		);
	}

	getActionButton() {
		if (!LighthouseUtil.isBlogPublic()) {
			return this.getReadingOptionsButton();
		} else if (LighthouseUtil.isHomeNoindex()) {
			return this.getHomepageOnpageButton();
		}
		return '';
	}

	getHomepageOnpageButton() {
		if (!LighthouseUtil.isTabAllowed('onpage')) {
			return '';
		}

		return (
			<Button
				href={LighthouseUtil.tabUrl('onpage')}
				text={__('Edit Settings', 'smartcrawl-seo')}
				icon="sui-icon-wrench-tool"
			/>
		);
	}

	getReadingOptionsButton() {
		if (LighthouseUtil.isMultisite()) {
			return '';
		}

		return (
			<Button
				text={__('Edit Settings', 'smartcrawl-seo')}
				href={LighthouseUtil.adminUrl('options-reading.php')}
				icon="sui-icon-wrench-tool"
			/>
		);
	}

	copyDescription() {
		return (
			sprintf(
				// translators: %s: Device label.
				__('Tested Device: %s', 'smartcrawl-seo'),
				LighthouseUtil.getDeviceLabel()
			) +
			'\n' +
			__('Audit Type: Indexing audits', 'smartcrawl-seo') +
			'\n\n' +
			__(
				'Failing Audit: Page is blocked from indexing',
				'smartcrawl-seo'
			) +
			'\n\n' +
			__('Status: Page is not crawlable', 'smartcrawl-seo') +
			'\n\n' +
			LighthouseUtil.getFlattenedDetails(
				[__('Blocking Directive Source', 'smartcrawl-seo')],
				this.getRows()
			) +
			__('Overview:', 'smartcrawl-seo') +
			'\n' +
			__(
				"Search engines can only show pages in their search results if those pages don't explicitly block indexing by search engine crawlers. Some HTTP headers and meta tags tell crawlers that a page shouldn't be indexed.",
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				"Only block indexing for content that you don't want to appear in search results.",
				'smartcrawl-seo'
			) +
			'\n\n' +
			createInterpolateElement(
				sprintf(
					// translators: %s: plugin title
					__(
						'For more information please check the SEO Audits section in <strong>%s</strong> plugin.',
						'smartcrawl-seo'
					),
					ConfigValues.get('plugin_title', 'admin')
				),
				{ strong: <strong /> }
			)
		);
	}

	getRows() {
		const items = LighthouseUtil.getRawDetails(this.props.id)?.items;

		const rows = [];

		if (items) {
			items.forEach((item) => {
				const source = item.source;

				if (source) {
					if (typeof source === 'string') {
						rows.push([source]);
					} else if (source.type) {
						const type = source.type;

						if (type === 'node') {
							const snippet = source.snippet;
							if (snippet) {
								rows.push([snippet]);
							}
						} else if (type === 'source-location') {
							const robotsUrl = source.url;
							if (robotsUrl) {
								rows.push([robotsUrl]);
							}
						}
					}
				}
			});
		}

		return rows;
	}
}
