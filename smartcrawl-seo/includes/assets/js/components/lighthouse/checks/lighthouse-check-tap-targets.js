import React from 'react';
import Notice from '../../notices/notice';
import { createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseCheckItem from '../lighthouse-check-item';
import LighthouseTapTargetsTable from '../tables/lighthouse-tap-targets-table';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckTapTargets extends React.Component {
	static defaultProps = {
		id: 'tap-targets',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__(
					'Tap targets are sized appropriately',
					'smartcrawl-seo'
				)}
				failureTitle={__(
					'Tap targets are not sized appropriately',
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
						{createInterpolateElement(
							__(
								'Interactive elements like buttons and links should be large enough (<strong>48x48px</strong>), and have enough space around them (<strong>8px</strong>), to be easy enough to tap without overlapping onto other elements.',
								'smartcrawl-seo'
							),
							{ strong: <strong /> }
						)}
					</p>
					<p>
						{__(
							'Many search engines rank pages based on how mobile-friendly they are. Making sure tap targets are big enough and far enough apart from each other makes your page more mobile-friendly and accessible.',
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
							'Tap targets are sized appropriately.',
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
							'Tap targets are not sized appropriately.',
							'smartcrawl-seo'
						)}
					/>
				</div>

				<div className="wds-lh-section">
					<p>
						{__(
							'Targets that are smaller than 48 px by 48 px or closer than 8 px apart fail the audit.',
							'smartcrawl-seo'
						)}
					</p>
					{this.renderTable()}
				</div>

				<div className="wds-lh-section">
					<strong>
						{__('How to fix your tap targets', 'smartcrawl-seo')}
					</strong>
					<ul>
						<li>
							{createInterpolateElement(
								__(
									"<strong>Step 1</strong>: Increase the size of tap targets that are too small. Tap targets that are <strong>48 px by 48 px</strong> never fail the audit. If you have elements that shouldn't appear any bigger (for example, icons), try increasing the padding property.",
									'smartcrawl-seo'
								),
								{ strong: <strong /> }
							)}
						</li>
						<li>
							{createInterpolateElement(
								__(
									'<strong>Step 2</strong>: Increase the spacing between tap targets that are too close together using properties like margin. There should be at least <strong>8px</strong> between tap targets.',
									'smartcrawl-seo'
								),
								{ strong: <strong /> }
							)}
						</li>
					</ul>
				</div>
			</React.Fragment>
		);
	}

	renderTable() {
		return (
			<LighthouseTapTargetsTable
				id={this.props.id}
				header={[
					__('Tap Target', 'smartcrawl-seo'),
					__('Size', 'smartcrawl-seo'),
					__('Overlapping Target', 'smartcrawl-seo'),
				]}
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
			__('Audit Type: Responsive audits', 'smartcrawl-seo') +
			'\n\n' +
			__(
				'Failing Audit: Tap targets are not sized appropriately',
				'smartcrawl-seo'
			) +
			'\n\n' +
			__(
				'Status: Tap targets are not sized appropriately.',
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				'Targets that are smaller than 48 px by 48 px or closer than 8 px apart fail the audit.',
				'smartcrawl-seo'
			) +
			'\n\n' +
			__('Overview:', 'smartcrawl-seo') +
			'\n' +
			__(
				'Interactive elements like buttons and links should be large enough (48x48px), and have enough space around them (8px), to be easy enough to tap without overlapping onto other elements.',
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				'Many search engines rank pages based on how mobile-friendly they are. Making sure tap targets are big enough and far enough apart from each other makes your page more mobile-friendly and accessible.',
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
					details: [
						item.tapTarget?.snippet,
						item.size,
						item.overlappingTargetsnippet,
					],
					tapTargetNodeId: item.tapTarget?.lhId,
					overlappingNodeId: item.overlappingTarget?.lhId,
				});
			});
		}

		return rows;
	}
}
