import React from 'react';
import CrawlItemGroup from './crawl-item-group';
import { __ } from '@wordpress/i18n';

export default class CrawlItemGroupInaccessible extends React.Component {
	render() {
		return (
			<CrawlItemGroup
				{...this.props}
				singularTitle={
					// translators: %s: Number of active items.
					__('%s URL could not be processed', 'smartcrawl-seo')
				}
				pluralTitle={
					// translators: %s: Number of active items.
					__('%s URLs could not be processed', 'smartcrawl-seo')
				}
				description={__(
					'Some of your URLs could not be processed by our crawlers. In the options menu you can List occurrences to see where these links can be found, and also set up and 301 redirects to a newer version of these pages.',
					'smartcrawl-seo'
				)}
			/>
		);
	}
}
