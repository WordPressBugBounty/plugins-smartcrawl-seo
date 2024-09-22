import React from 'react';
import Notice from '../../notices/notice';
import { createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseCheckItem from '../lighthouse-check-item';
import LighthouseToggle from '../lighthouse-toggle';
import LighthouseTag from '../lighthouse-tag';
import Button from '../../button';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckDocumentTitle extends React.Component {
	static defaultProps = {
		id: 'document-title',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__(
					'Document has a <title> element',
					'smartcrawl-seo'
				)}
				failureTitle={__(
					"Document doesn't have a <title> element",
					'smartcrawl-seo'
				)}
				successDescription={this.successDescription()}
				failureDescription={this.failureDescription()}
				copyDescription={() => this.copyDescription()}
				actionButton={this.getActionButton()}
			/>
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
				text={__('Add Title', 'smartcrawl-seo')}
			/>
		);
	}

	commonDescription() {
		return (
			<div className="wds-lh-section">
				<strong>{__('Overview', 'smartcrawl-seo')}</strong>
				<p>
					{__(
						'Having a <title> element on every page helps all your users:',
						'smartcrawl-seo'
					)}
				</p>
				<ul>
					<li>
						{__(
							'Search engine users rely on the title to determine whether a page is relevant to their search.',
							'smartcrawl-seo'
						)}
					</li>
					<li>
						{__(
							'The title also gives users of screen readers and other assistive technologies an overview of the page. The title is the first text that an assistive technology announces.',
							'smartcrawl-seo'
						)}
					</li>
				</ul>
			</div>
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
						message={__(
							'Your homepage has a <title> element, well done!',
							'smartcrawl-seo'
						)}
						icon="sui-icon-info"
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
							"We couldn't find a <title> tag on your homepage.",
							'smartcrawl-seo'
						)}
					/>
				</div>

				<div className="wds-lh-section">
					<strong>
						{__('How to add a title', 'smartcrawl-seo')}
					</strong>
					<p>
						{createInterpolateElement(
							__(
								'Open the <strong>Titles & Meta</strong> editor and add a meta title (and description) for your homepage. While you’re there, set up your default format for all other post types to ensure you always have a good quality <title> output.',
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
						{__('Tips for creating great titles', 'smartcrawl-seo')}
					</strong>
					<p>
						{__(
							'Having a <title> element on every page helps all your users:'
						)}
					</p>
					<ul>
						<li>
							{__(
								'Use a unique title for each page.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								'Make titles descriptive and concise. Avoid vague titles like "Home."',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								"Avoid keyword stuffing. It doesn't help users, and search engines may mark the page as spam.",
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								"It's OK to brand your titles, but do so concisely.",
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
							<LighthouseTag tag="title">
								{__('Donut recipe', 'smartcrawl-seo')}
							</LighthouseTag>
						</div>

						<p>
							<strong className="wds-lh-green-word">
								{__('Do. ')}
							</strong>
							{__('Descriptive yet concise.')}
						</p>
						<div className="wds-lh-highlight wds-lh-highlight-success">
							<LighthouseTag tag="title">
								{__(
									"Mary's quick maple bacon donut recipe",
									'smartcrawl-seo'
								)}
							</LighthouseTag>
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
				"Failing Audit: Document doesn't have a <title> element",
				'smartcrawl-seo'
			) +
			'\n\n' +
			__(
				"Status: We couldn't find a <title> tag on your homepage.",
				'smartcrawl-seo'
			) +
			'\n\n' +
			__('Overview:', 'smartcrawl-seo') +
			'\n' +
			__(
				'Having a <title> element on every page helps all your users:',
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				'- Search engine users rely on the title to determine whether a page is relevant to their search.',
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				'- The title also gives users of screen readers and other assistive technologies an overview of the page. The title is the first text that an assistive technology announces.',
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
