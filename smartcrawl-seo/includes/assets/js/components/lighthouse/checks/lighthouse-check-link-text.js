import React from 'react';
import LighthouseCheckItem from '../lighthouse-check-item';
import { createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import Notice from '../../notices/notice';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseToggle from '../lighthouse-toggle';
import LighthouseTag from '../lighthouse-tag';
import LighthouseTable from '../tables/lighthouse-table';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckLinkText extends React.Component {
	static defaultProps = {
		id: 'link-text',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__(
					'Links have descriptive text',
					'smartcrawl-seo'
				)}
				failureTitle={__(
					'Links do not have descriptive text',
					'smartcrawl-seo'
				)}
				commonDescription={this.commonDescription()}
				successDescription={this.successDescription()}
				failureDescription={this.failureDescription()}
				copyDescription={() => this.copyDescription()}
				actionButton={LighthouseUtil.editHomepageButton()}
			/>
		);
	}

	commonDescription() {
		return (
			<React.Fragment>
				<strong>{__('Overview', 'smartcrawl-seo')}</strong>
				<p>
					{__(
						"Link text is the clickable word or phrase in a hyperlink. When link text clearly conveys a hyperlink's target, both users and search engines can more easily understand your content and how it relates to other pages.",
						'smartcrawl-seo'
					)}
				</p>
			</React.Fragment>
		);
	}

	successDescription() {
		return (
			<React.Fragment>
				<div className="wds-lh-section">{this.commonDescription()}</div>

				<div className="wds-lh-section">
					<strong>{__('Status', 'smartcrawl-seo')}</strong>
					<Notice
						type="success"
						icon="sui-icon-info"
						message={__(
							'All your links have descriptive text, nice work.',
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
				<div className="wds-lh-section cf">
					{this.commonDescription()}

					<p>
						{__(
							'Lighthouse flags the following generic link text:',
							'smartcrawl-seo'
						)}
					</p>
					<ul
						style={{
							float: 'left',
							width: '30%',
							marginBottom: '0',
						}}
					>
						<li>{__('click here', 'smartcrawl-seo')}</li>
						<li>{__('click this', 'smartcrawl-seo')}</li>
						<li>{__('go', 'smartcrawl-seo')}</li>
					</ul>
					<ul
						style={{
							float: 'left',
							width: '30%',
							marginBottom: '0',
						}}
					>
						<li>{__('here', 'smartcrawl-seo')}</li>
						<li>{__('this', 'smartcrawl-seo')}</li>
						<li>{__('start', 'smartcrawl-seo')}</li>
					</ul>
					<ul
						style={{
							float: 'left',
							width: '30%',
							marginBottom: '0',
						}}
					>
						<li>{__('right here', 'smartcrawl-seo')}</li>
						<li>{__('more', 'smartcrawl-seo')}</li>
						<li>{__('learn more', 'smartcrawl-seo')}</li>
					</ul>
				</div>

				<div className="wds-lh-section">
					<strong>{__('Status', 'smartcrawl-seo')}</strong>
					<Notice
						type="warning"
						icon="sui-icon-info"
						message={__(
							'Some links are empty and without helpful descriptive text.',
							'smartcrawl-seo'
						)}
					/>
					{this.renderTable()}
				</div>

				<div className="wds-lh-section">
					<strong>
						{__(
							'How to add descriptive link text',
							'smartcrawl-seo'
						)}
					</strong>
					<p>
						{__(
							'Replace generic phrases like "click here" and "learn more" with specific descriptions. In general, write link text that clearly indicates what type of content users will get if they follow the hyperlink.',
							'smartcrawl-seo'
						)}
					</p>
				</div>

				<LighthouseToggle text={__('Read More - Best practices')}>
					<strong>
						{__('Link text best practices', 'smartcrawl-seo')}
					</strong>
					<ul>
						<li>
							{__(
								"Stay on topic. Don't use link text that has no relation to the page's content.",
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								"Don't use the page's URL as the link description unless you have a good reason to do so, such as referencing a site's new address.",
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								'Keep descriptions concise. Aim for a few words or a short phrase.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								'Pay attention to your internal links too. Improving the quality of internal links can help both users and search engines navigate your site more easily.',
								'smartcrawl-seo'
							)}
						</li>
					</ul>

					<div className="wds-lh-highlight-container">
						<p>
							<strong className="wds-lh-red-word">
								{__('Don’t. ')}
							</strong>
							{__(
								'"Click here" doesn\'t convey where the hyperlink will take users.',
								'smartcrawl-seo'
							)}
						</p>
						<div className="wds-lh-highlight wds-lh-highlight-error">
							<LighthouseTag tag="p">
								{createInterpolateElement(
									__(
										'To see all of our basketball videos, <a>click here</a>.',
										'smartcrawl-seo'
									),
									{
										a: (
											<LighthouseTag
												tag="a"
												attributes={{
													href: (
														<span className="wds-lh-tag">
															videos.html
														</span>
													),
												}}
											/>
										),
									}
								)}
							</LighthouseTag>
						</div>

						<p>
							<strong className="wds-lh-green-word">
								{__('Do. ')}
							</strong>
							{__(
								'"Basketball videos" clearly conveys that the hyperlink will take users to a page of videos.'
							)}
						</p>
						<div className="wds-lh-highlight wds-lh-highlight-success">
							<LighthouseTag tag="p">
								{createInterpolateElement(
									__(
										'Check out all of our <a>basketball videos</a>.'
									),
									{
										a: (
											<LighthouseTag
												tag="a"
												attributes={{
													href: (
														<span className="wds-lh-tag">
															videos.html
														</span>
													),
												}}
											/>
										),
									}
								)}
							</LighthouseTag>
						</div>
						<div
							dangerouslySetInnerHTML={{
								__html: sprintf(
									// translators: 1: Link target, 2, 4: Links, 5,6: Link texts.
									__(
										'See the <a target="%1$s" href="%2$s">%3$s</a> section of <a target="%1$s" href="%4$s">%5$s</a> for more tips.',
										'smartcrawl-seo'
									),
									'_blank',
									'https://developers.google.com/search/docs/beginner/seo-starter-guide#use-links-wisely',
									__('Use links wisely', 'smartcrawl-seo'),
									'https://developers.google.com/search/docs/beginner/seo-starter-guide',
									__(
										"Google's Search Engine Optimization (SEO) Starter Guide",
										'smartcrawl-seo'
									)
								),
							}}
						/>
					</div>
				</LighthouseToggle>
			</React.Fragment>
		);
	}

	getLinkTextTooltip() {
		return (
			<span
				className="sui-tooltip sui-tooltip-constrained"
				data-tooltip={__(
					'To locate the Link text on your homepage, use the Find tool of your browser.',
					'smartcrawl-seo'
				)}
			>
				<span
					className="sui-notice-icon sui-icon-info sui-sm"
					aria-hidden="true"
				/>
			</span>
		);
	}

	renderTable() {
		return (
			<LighthouseTable
				id={this.props.id}
				header={[
					<React.Fragment key={0}>
						{createInterpolateElement(
							__('Link Text <span/>', 'smartcrawl-seo'),
							{ span: this.getLinkTextTooltip() }
						)}
					</React.Fragment>,
					<React.Fragment key={1}>
						{__('Link Description', 'smartcrawl-seo')}
					</React.Fragment>,
				]}
				rows={this.getRows()}
			/>
		);
	}

	copyDescription() {
		return (
			sprintf(
				// translators: Device label.
				__('Tested Device: %s', 'smartcrawl-seo'),
				LighthouseUtil.getDeviceLabel()
			) +
			'\n' +
			__('Audit Type: Content audits', 'smartcrawl-seo') +
			'\n\n' +
			__(
				'Failing Audit: Links do not have descriptive text',
				'smartcrawl-seo'
			) +
			'\n\n' +
			__(
				'Status: Some links are empty and without helpful descriptive text.',
				'smartcrawl-seo'
			) +
			'\n\n' +
			LighthouseUtil.getFlattenedDetails(
				[
					__('Link Text', 'smartcrawl-seo'),
					__('Link Destination', 'smartcrawl-seo'),
				],
				this.getRows()
			) +
			__('Overview:', 'smartcrawl-seo') +
			'\n' +
			__(
				"Link text is the clickable word or phrase in a hyperlink. When link text clearly conveys a hyperlink's target, both users and search engines can more easily understand your content and how it relates to other pages.",
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				'Lighthouse flags the following generic link text: click here, click this, go,here,this,start,right here,more and learn more',
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
				rows.push([item.text, item.href]);
			});
		}

		return rows;
	}
}
