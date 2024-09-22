import React from 'react';
import LighthouseCheckItem from '../lighthouse-check-item';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import Notice from '../../notices/notice';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseToggle from '../lighthouse-toggle';
import LighthouseTag from '../lighthouse-tag';
import Button from '../../button';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckMetaDescription extends React.Component {
	static defaultProps = {
		id: 'meta-description',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__(
					'Document has a meta description',
					'smartcrawl-seo'
				)}
				failureTitle={__(
					'Document does not have a meta description',
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
				<strong>{__('Overview', 'smartcrawl-seo')}</strong>
				<p>
					{createInterpolateElement(
						__(
							'The <strong><meta name="description"></strong> element provides a summary of a page\'s content that search engines include in search results. A high-quality, unique meta description makes your page appear more relevant and can increase your search traffic.',
							'smartcrawl-seo'
						),
						{ strong: <strong /> }
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
							'Your homepage has a meta description, well done!',
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
				<div className="wds-lh-section">
					{this.commonDescription()}
					<p>{__('The audit fails if:', 'smartcrawl-seo')}</p>
					<ul>
						<li>
							{createInterpolateElement(
								__(
									'If your page doesn\'t have a <strong><meta name="description"></strong> element.',
									'smartcrawl-seo'
								),
								{
									strong: <strong />,
								}
							)}
						</li>
						<li>
							{createInterpolateElement(
								__(
									'The <strong>content</strong> attribute of the <strong><meta name="description"></strong> element is empty.',
									'smartcrawl-seo'
								),
								{
									strong: <strong />,
								}
							)}
						</li>
					</ul>
				</div>

				<div className="wds-lh-section">
					<strong>{__('Status', 'smartcrawl-seo')}</strong>
					<Notice
						type="warning"
						icon="sui-icon-info"
						message={__(
							"We couldn't find a meta description tag on your homepage.",
							'smartcrawl-seo'
						)}
					/>
				</div>

				<div className="wds-lh-section">
					<strong>
						{__('How to add a meta description', 'smartcrawl-seo')}
					</strong>
					<p>
						{createInterpolateElement(
							__(
								'Open the <strong>Titles & Meta</strong> editor and add a meta description (and title) for your homepage. While you\'re there, set up your default format for all other post types to ensure you always have a good quality <meta name="description"> output.',
								'smartcrawl-seo'
							),
							{
								strong: <strong />,
							}
						)}
					</p>
				</div>

				<LighthouseToggle text={__('Read More - Best practices')}>
					<strong>
						{__(
							'Meta description best practices',
							'smartcrawl-seo'
						)}
					</strong>
					<ul>
						<li>
							{__(
								'Use a unique description for each page.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								'Make descriptions relevant and concise. Avoid vague descriptions like "Home page”.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{createInterpolateElement(
								__(
									"Avoid <a>keyword stuffing</a>. It doesn't help users, and search engines may mark the page as spam.",
									'smartcrawl-seo'
								),
								{
									a: (
										<a
											href="https://developers.google.com/search/docs/advanced/guidelines/irrelevant-keywords"
											target="_blank"
											rel="noreferrer"
										/>
									),
								}
							)}
						</li>
						<li>
							{__(
								"Descriptions don't have to be complete sentences; they can contain structured data.",
								'smartcrawl-seo'
							)}
						</li>
					</ul>

					<div className="wds-lh-highlight-container">
						<p>
							<strong className="wds-lh-red-word">
								{__('Don’t. ')}
							</strong>
							{__('Too vague.')}
						</p>
						<div className="wds-lh-highlight wds-lh-highlight-error">
							<LighthouseTag
								tag="meta"
								attributes={{
									name: 'description',
									content: __(
										'Donut recipe',
										'smartcrawl-seo'
									),
								}}
							/>
						</div>

						<p>
							<strong className="wds-lh-green-word">
								{__('Do. ')}
							</strong>
							{__('Descriptive yet concise.')}
						</p>
						<div className="wds-lh-highlight wds-lh-highlight-success">
							<LighthouseTag
								tag="meta"
								attributes={{
									name: 'description',
									content: __(
										"Mary's simple recipe for maple bacon donuts makes a sticky, sweet treat with just a hint of salt that you'll keep coming back for.",
										'smartcrawl-seo'
									),
								}}
							/>
						</div>
					</div>

					<p>
						{createInterpolateElement(
							__(
								"See Google's <a>Create good titles and snippets in Search Results</a> page for more details about these tips.",
								'smartcrawl-seo'
							),
							{
								a: (
									<a
										href="https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets"
										target="_blank"
										rel="noreferrer"
									/>
								),
							}
						)}
					</p>
				</LighthouseToggle>
			</React.Fragment>
		);
	}

	getActionButton() {
		if (!LighthouseUtil.isTabAllowed('onpage')) {
			return '';
		}

		return (
			<Button
				href={LighthouseUtil.tabUrl('onpage')}
				icon="sui-icon-plus"
				text={__('Add Description', 'smartcrawl-seo')}
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
			__('Audit Type: Content audits', 'smartcrawl-seo') +
			'\n\n' +
			__(
				'Failing Audit: Document does not have a meta description',
				'smartcrawl-seo'
			) +
			'\n\n' +
			__(
				"Status: We couldn't find a meta description tag on your homepage.",
				'smartcrawl-seo'
			) +
			'\n\n' +
			__('Overview:', 'smartcrawl-seo') +
			'\n' +
			__(
				'The <meta name="description"> element provides a summary of a page\'s content that search engines include in search results. A high-quality, unique meta description makes your page appear more relevant and can increase your search traffic.',
				'smartcrawl-seo'
			) +
			'\n' +
			__('The audit fails if:', 'smartcrawl-seo') +
			'\n' +
			__(
				'- If your page doesn\'t have a <meta name="description"> element.',
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				'- The content attribute of the <meta name="description"> element is empty.',
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
}
