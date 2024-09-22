import React from 'react';
import Notice from '../../notices/notice';
import { createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseCheckItem from '../lighthouse-check-item';
import LighthouseTable from '../tables/lighthouse-table';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckPlugins extends React.Component {
	static defaultProps = {
		id: 'plugins',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__(
					'Document avoids browser plugins',
					'smartcrawl-seo'
				)}
				failureTitle={__(
					'Document uses browser plugins',
					'smartcrawl-seo'
				)}
				successDescription={this.successDescription()}
				failureDescription={this.failureDescription()}
				copyDescription={() => this.copyDescription()}
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
							"Search engines often can't index content that relies on browser plugins, such as Java or Flash. That means browser plugin-based content doesn't show up in search results.",
							'smartcrawl-seo'
						)}
					</p>
					<p>
						{__(
							"Also, most mobile devices don't support browser plugins, which creates frustrating experiences for mobile users.",
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
						message={__(
							'Document avoids browser plugins - Google is loving it!',
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
							'Document uses browser plugins - Search Engines can’t index browser plugins.',
							'smartcrawl-seo'
						)}
					/>
					{this.renderTable()}
				</div>

				<div className="wds-lh-section">
					<strong>
						{__(
							"Don't use browser plugins to display your content",
							'smartcrawl-seo'
						)}
					</strong>
					<p>
						{createInterpolateElement(
							__(
								'To convert browser plugin-based content to HTML, refer to guidance for that plugin. For example, MDN explains <a>how to convert Flash video to HTML5 video</a>.',
								'smartcrawl-seo'
							),
							{
								a: (
									<a
										href="https://developer.mozilla.org/en-US/docs/Plugins/FlashToHTML5/Video"
										target="_blank"
										rel="noreferrer"
									/>
								),
							}
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
				header={[__('Element source', 'smartcrawl-seo')]}
				rows={this.getRows()}
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
				'Failing Audit: Document uses browser plugins',
				'smartcrawl-seo'
			) +
			'\n\n' +
			__(
				'Status: Document uses browser plugins - Search Engines can’t index browser plugins.',
				'smartcrawl-seo'
			) +
			'\n\n' +
			this.getFlattenedDetails(
				[__('Element source', 'smartcrawl-seo')],
				this.getRows()
			) +
			__('Overview:', 'smartcrawl-seo') +
			'\n' +
			__(
				"Search engines often can't index content that relies on browser plugins, such as Java or Flash. That means browser plugin-based content doesn't show up in search results.",
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				"Also, most mobile devices don't support browser plugins, which creates frustrating experiences for mobile users.",
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
				rows.push({
					cols: [item.source?.snippet],
					screenshot: item.source?.lhId,
				});
			});
		}

		return rows;
	}

	getFlattenedDetails(header, rows) {
		if (!rows.length) {
			return [];
		}

		const flattenedDetails = [];

		rows.forEach((row) => {
			row.cols.forEach((col, index) => {
				let colHeader = header[index];

				if (colHeader) {
					colHeader =
						colHeader === 'object' ? colHeader : colHeader + ': ';
				}
				flattenedDetails.push(colHeader + col);
			});
		});

		return flattenedDetails.join('\n') + '\n\n';
	}
}
