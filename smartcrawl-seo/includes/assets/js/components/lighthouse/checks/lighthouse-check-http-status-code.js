import React from 'react';
import LighthouseCheckItem from '../lighthouse-check-item';
import Notice from '../../notices/notice';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

export default class LighthouseCheckHttpStatusCode extends React.Component {
	static defaultProps = {
		id: 'http-status-code',
	};

	render() {
		return (
			<LighthouseCheckItem
				id={this.props.id}
				successTitle={__(
					'Page has successful HTTP status code',
					'smartcrawl-seo'
				)}
				failureTitle={__(
					'Page has unsuccessful HTTP status code',
					'smartcrawl-seo'
				)}
				successDescription={this.successDescription()}
				failureDescription={this.failureDescription()}
			/>
		);
	}

	commonDescription() {
		return (
			<React.Fragment>
				<div className="wds-lh-section">
					<strong>{__('Overview', 'smartcrawl-seo')}</strong>
					<p
						dangerouslySetInnerHTML={{
							__html: sprintf(
								// translators: 1,3: Link urls, 2,4: Link texts.
								__(
									'Servers provide a three-digit <a target="_blank" href="%1$s">%2$s</a> for each resource request they receive. Status codes in the 400s and 500s <a target="_blank" href="%3$s">%4$s</a> with the requested resource. If a search engine encounters a status code error when it\'s crawling a web page, it may not index that page properly.',
									'smartcrawl-seo'
								),
								'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
								__('HTTP status code', 'smartcrawl-seo'),
								'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#ClientErrorResponses',
								__(
									"indicate that there's an error",
									'smartcrawl-seo'
								)
							),
						}}
					/>
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
							'Page has a successful HTTP status code.',
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
							'Page returns an unsuccessful HTTP status code.',
							'smartcrawl-seo'
						)}
					/>
				</div>

				<div className="wds-lh-section">
					<strong>
						{__(
							'How to fix an unsuccessful HTTP status code',
							'smartcrawl-seo'
						)}
					</strong>
					<p>
						{__(
							"First make sure you actually want search engines to crawl the page. Some pages, like your 404 page or any other page that shows an error, shouldn't be included in search results.",
							'smartcrawl-seo'
						)}
					</p>
					<p>
						{__(
							'To fix an HTTP status code error, refer to the documentation for your server or hosting provider. The server should return a status code in the 200s for all valid URLs or a status code in the 300s for a resource that has moved to another URL.',
							'smartcrawl-seo'
						)}
					</p>
					{'\n'}
					<p>
						{createInterpolateElement(
							__(
								'See <a>Source code for Page has unsuccessful HTTP status code audit</a> page for more information.',
								'smartcrawl-seo'
							),
							{
								a: (
									<a
										href="https://web.dev/http-status-code/"
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
}
