import React from 'react';
import LighthouseCheckItem from '../lighthouse-check-item';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import Notice from '../../notices/notice';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseTable from '../tables/lighthouse-table';
import Button from '../../button';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckRobotsTxt extends React.Component {
	static defaultProps = {
		id: 'robots-txt',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__('robots.txt is valid', 'smartcrawl-seo')}
				failureTitle={__('robots.txt is not valid', 'smartcrawl-seo')}
				successDescription={this.successDescription()}
				failureDescription={this.failureDescription()}
				copyDescription={() => this.copyDescription()}
				activeButton={this.getActionButton()}
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
							"The robots.txt file tells search engines which of your site's pages they can crawl. An invalid robots.txt configuration can cause two types of problems:",
							'smartcrawl-seo'
						)}
					</p>
					<ul>
						<li>
							{__(
								'It can keep search engines from crawling public pages, causing your content to show up less often in search results.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								'It can cause search engines to crawl pages you may not want shown in search results.',
								'smartcrawl-seo'
							)}
						</li>
					</ul>
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
						message={__(
							"We've detected a robots.txt file, nice work.",
							'smartcrawl-seo'
						)}
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
						message={__(
							'The robots.txt file is not valid.',
							'smartcrawl-seo'
						)}
					/>
					<p>
						{__(
							'If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed.',
							'smartcrawl-seo'
						)}
					</p>
					{this.renderTable()}
				</div>

				<div className="wds-lh-section">
					<strong>
						{__(
							'How to fix problems with robots.txt',
							'smartcrawl-seo'
						)}
					</strong>
					<p>
						{createInterpolateElement(
							sprintf(
								// translators: %s: plugin title
								__(
									'<strong>%s</strong> can automatically add a robots.txt file for you, and link to your sitemap. Jump to <strong>Advanced Tools / Robots.txt Editor</strong> and fix the issues in your robots.txt file.',
									'smartcrawl-seo'
								),
								ConfigValues.get('plugin_title', 'admin')
							),
							{ strong: <strong /> }
						)}
					</p>
				</div>
			</React.Fragment>
		);
	}

	renderTable() {
		return (
			<LighthouseTable
				id={this.props.id}
				header={[
					__('Line Number', 'smartcrawl-seo'),
					__('Content', 'smartcrawl-seo'),
					__('Error', 'smartcrawl-seo'),
				]}
				rows={this.getRows()}
			/>
		);
	}

	getActionButton() {
		if (!LighthouseUtil.isTabAllowed('autolinks')) {
			return '';
		}

		return (
			<Button
				text={__('Edit Robots.txt', 'smartcrawl-seo')}
				href={
					LighthouseUtil.tabUrl('autolinks') + '&tab=tabRobotsEditor'
				}
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
			__('Failing Audit: robots.txt is not valid', 'smartcrawl-seo') +
			'\n\n' +
			__('Status: The robots.txt file is not valid.', 'smartcrawl-seo') +
			'\n' +
			__(
				'If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed.',
				'smartcrawl-seo'
			) +
			'\n\n' +
			LighthouseUtil.getFlattenedDetails(
				[
					__('Line Number', 'smartcrawl-seo'),
					__('Content', 'smartcrawl-seo'),
					__('Error', 'smartcrawl-seo'),
				],
				this.getRows()
			) +
			__('Overview:', 'smartcrawl-seo') +
			'\n' +
			__(
				"The robots.txt file tells search engines which of your site's pages they can crawl. An invalid robots.txt configuration can cause two types of problems:",
				'smartcrawl-seo'
			) +
			'\n\n' +
			__(
				'- It can keep search engines from crawling public pages, causing your content to show up less often in search results.',
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				'- It can cause search engines to crawl pages you may not want shown in search results.',
				'smartcrawl-seo'
			) +
			'\n' +
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
				rows.push([item.index, item.line, item.message]);
			});
		}

		return rows;
	}
}
