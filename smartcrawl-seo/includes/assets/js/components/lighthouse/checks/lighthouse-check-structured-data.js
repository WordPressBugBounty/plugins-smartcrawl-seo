import React from 'react';
import Notice from '../../notices/notice';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import LighthouseUtil from '../utils/lighthouse-util';
import LighthouseCheckItem from '../lighthouse-check-item';
import Button from '../../button';
import ConfigValues from '../../../es6/config-values';

export default class LighthouseCheckStructuredData extends React.Component {
	static defaultProps = {
		id: 'structured-data',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__('Structured data is valid', 'smartcrawl-seo')}
				failureTitle={__(
					'Structured data is invalid',
					'smartcrawl-seo'
				)}
				successDescription={this.formatDescription()}
				failureDescription={this.formatDescription()}
			/>
		);
	}

	formatDescription() {
		const schemaBuilderUrl =
			LighthouseUtil.tabUrl('schema') + '&tab=tab_types';
		const testingTool = LighthouseUtil.testingTool();

		return (
			<React.Fragment>
				<div className="wds-lh-section">
					<strong>{__('Overview', 'smartcrawl-seo')}</strong>
					<p>
						{__(
							'Search engines use structured data to understand what kind of content is on your page. For example, you can tell search engines that your page is an article, a job posting, or an FAQ.',
							'smartcrawl-seo'
						)}
					</p>
					<p>
						{__(
							'Marking up your content with structured data makes it more likely that it will be included in rich search results. For example, content marked up as an article might appear in a list of top stories relevant to something the user searched for.',
							'smartcrawl-seo'
						)}
					</p>
				</div>

				<div className="wds-lh-section">
					<strong>{__('Status', 'smartcrawl-seo')}</strong>
					<Notice
						type="grey"
						message={__(
							'The Lighthouse structured data audit is manual, so it does not affect your Lighthouse SEO score.',
							'smartcrawl-seo'
						)}
					/>
				</div>

				<div className="wds-lh-section">
					<strong>
						{__('How to mark up your content', 'smartcrawl-seo')}
					</strong>
					<ol>
						<li>
							{__(
								'Identify the content type that represents your content.',
								'smartcrawl-seo'
							)}
						</li>
						<li>
							{createInterpolateElement(
								sprintf(
									// translators: %s: plugin title
									__(
										"Create the structured data markup using <strong>%s</strong>'s <a>Schema Types Builder</a>, and ensure location rules are configured for the content types you want to make available to search engines.",
										'smartcrawl-seo'
									),
									ConfigValues.get('plugin_title', 'admin')
								),
								{
									a: <a href={schemaBuilderUrl} />,
									strong: <strong />,
								}
							)}
						</li>
						<li>
							{createInterpolateElement(
								__(
									'Run the <a>Structured Data Linter</a> to validate your structured data.',
									'smartcrawl-seo'
								),
								{
									a: (
										<a
											href="//linter.structured-data.org/"
											target="_blank"
											rel="noreferrer"
										/>
									),
								}
							)}
						</li>
						<li>
							{__(
								'Test how the markup works in Google Search:',
								'smartcrawl-seo'
							)}
							<br />
							<Button
								href={testingTool}
								target="_blank"
								ghost
								icon="sui-icon-target"
								text={__(
									'Structured Data Testing Tool',
									'smartcrawl-seo'
								)}
							/>
						</li>
					</ol>

					<p>
						{createInterpolateElement(
							__(
								"See Google's <a>Mark Up Your Content Items</a> page for more information.",
								'smartcrawl-seo'
							),
							{
								a: (
									<a href="https://developers.google.com/search/docs/guides/mark-up-content" />
								),
							}
						)}
					</p>
				</div>
			</React.Fragment>
		);
	}
}
