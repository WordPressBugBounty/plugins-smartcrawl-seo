import React from 'react';
import Notice from '../../notices/notice';
import { createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseCheckItem from '../lighthouse-check-item';
import LighthouseTag from '../lighthouse-tag';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckViewport extends React.Component {
	static defaultProps = {
		id: 'viewport',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__(
					'Has a <meta name="viewport"> tag with width or initial-scale',
					'smartcrawl-seo'
				)}
				failureTitle={__(
					'Does not have a <meta name="viewport"> tag with width or initial-scale',
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
							'Many search engines rank pages based on how mobile-friendly they are. Without a viewport meta tag, mobile devices render pages at typical desktop screen widths and then scale the pages down, making them difficult to read.',
							'smartcrawl-seo'
						)}
					</p>
					<p>
						{createInterpolateElement(
							__(
								"Setting the <a>viewport meta tag</a> lets you control the width and scaling of the viewport so that it's sized correctly on all devices.",
								'smartcrawl-seo'
							),
							{
								a: (
									<a
										href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag"
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

	successDescription() {
		return (
			<React.Fragment>
				{this.commonDescription()}
				<div className="wds-lh-section">
					<strong>{__('Status', 'smartcrawl-seo')}</strong>
					<Notice
						type="success"
						icon="sui-icon-info"
						message={createInterpolateElement(
							__(
								'Has a <strong><meta name="viewport"></strong> tag with <strong>width</strong> or <strong>initial-scale</strong>',
								'smartcrawl-seo'
							),
							{ strong: <strong /> }
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
						message={createInterpolateElement(
							__(
								"We couldn't find any <strong>viewport metatag</strong>.",
								'smartcrawl-seo'
							),
							{ strong: <strong /> }
						)}
					/>
				</div>

				<div className="wds-lh-section">
					<p>
						{__(
							'A page fails the audit unless all of these conditions are met:',
							'smartcrawl-seo'
						)}
					</p>
					<ul>
						<li>
							{__(
								'The document\'s <head> contains a <meta name="viewport"> tag.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								'The viewport meta tag contains a content attribute.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								"The content attribute's value includes the text width=.",
								'smartcrawl-seo'
							)}
						</li>
					</ul>

					<p>
						{__(
							"Lighthouse doesn't check that width equals device-width. It also doesn't check for an initial-scale key-valuepair. However, you still need to include both for your page to render correctly on mobile devices.",
							'smartcrawl-seo'
						)}
					</p>
				</div>

				<div className="wds-lh-section">
					<strong>
						{__('How to add a viewport meta tag', 'smartcrawl-seo')}
					</strong>
					<p>
						{__(
							'Add a viewport <meta> tag with the appropriate key-value pairs to the <head> of your page:',
							'smartcrawl-seo'
						)}
					</p>

					<div className="wds-lh-highlight">
						<LighthouseTag tag="doctype" />
						<br />
						<LighthouseTag
							tag="html"
							attributes={{ lang: 'en' }}
							selfClosing={false}
						/>
						<br />
						&nbsp;&nbsp;
						<LighthouseTag tag="head">
							<br />
							&nbsp;&nbsp;&nbsp;&nbsp;...
							<br />
							&nbsp;&nbsp;&nbsp;&nbsp;
							<LighthouseTag
								tag="meta"
								attributes={{
									name: 'viewport',
									content:
										'width=device-width, initial-scale=1',
								}}
								selfClosing={false}
							/>
							<br />
							&nbsp;&nbsp;&nbsp;&nbsp;...
							<br />
							&nbsp;&nbsp;
						</LighthouseTag>
						<br />
						&nbsp;&nbsp;...
					</div>

					<p>
						{__(
							"Here's what each key-value pair does:",
							'smartcrawl-seo'
						)}
					</p>
					<ul>
						<li>
							{__(
								'width=device-width sets the width of the viewport to the width of the device.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{__(
								'initial-scale=1 sets the initial zoom level when the user visits the page.',
								'smartcrawl-seo'
							)}
						</li>
					</ul>

					<Notice
						type="grey"
						icon="sui-icon-info"
						message={createInterpolateElement(
							__(
								'This audit should be fixed by your theme developer. Click the <strong>Copy Audit</strong> button below to save and send them the required info.',
								'smartcrawl-seo'
							),
							{ strong: <strong /> }
						)}
					/>
				</div>
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
			__('Audit Type: Responsive audits', 'smartcrawl-seo') +
			'\n\n' +
			__(
				'Failing Audit: Does not have a <meta name="viewport"> tag with width or initial-scale',
				'smartcrawl-seo'
			) +
			'\n\n' +
			__(
				"Status: We couldn't find any viewport metatag.",
				'smartcrawl-seo'
			) +
			'\n\n' +
			__('Overview:', 'smartcrawl-seo') +
			'\n' +
			__(
				'Many search engines rank pages based on how mobile-friendly they are. Without a viewport meta tag, mobile devices render pages at typical desktop screen widths and then scale the pages down, making them difficult to read.',
				'smartcrawl-seo'
			) +
			'\n' +
			__(
				"Setting the viewport meta tag lets you control the width and scaling of the viewport so that it's sized correctly on all devices.",
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
