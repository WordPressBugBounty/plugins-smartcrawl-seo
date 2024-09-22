import React from 'react';
import { __ } from '@wordpress/i18n';
import SettingsRow from '../../../components/settings-row';
import Toggle from '../../../components/toggle';
import ConfigValues from '../../../es6/config-values';

export default class Indexing extends React.Component {
	render() {
		const config = ConfigValues.get('advanced', 'metabox');
		const { indexing } = config;

		return (
			<SettingsRow
				label={__('Indexing', 'smartcrawl-seo')}
				description={__(
					'Choose how search engines will index this particular page.',
					'smartcrawl-seo'
				)}
			>
				<div className="sui-form-field">
					<Toggle
						id={`wds_meta-robots-${
							indexing.post_type_noindexed ? 'index' : 'noindex'
						}`}
						name={`wds_meta-robots-${
							indexing.post_type_noindexed ? 'index' : 'noindex'
						}`}
						label={
							indexing.post_type_noindexed
								? __(
										'Index - Override Post Type Setting',
										'smartcrawl-seo'
								  )
								: __('Index', 'smartcrawl-seo')
						}
						description={__(
							'Instruct search engines whether or not you want this post to appear in search results.',
							'smartcrawl-seo'
						)}
						checked={
							indexing.post_type_noindexed
								? !!indexing.robots_index
								: !!indexing.robots_noindex
						}
						inverted={!indexing.post_type_noindexed}
					></Toggle>
				</div>
				<div className="sui-form-field">
					<Toggle
						id={`wds_meta-robots-${
							indexing.post_type_nofollowed
								? 'follow'
								: 'nofollow'
						}`}
						name={`wds_meta-robots-${
							indexing.post_type_nofollowed ? 'index' : 'nofollow'
						}`}
						label={
							indexing.post_type_nofollowed
								? __(
										'Follow - Override Post Type Setting',
										'smartcrawl-seo'
								  )
								: __('Follow', 'smartcrawl-seo')
						}
						description={__(
							'Tells search engines whether or not to follow the links on your page and crawl them too.',
							'smartcrawl-seo'
						)}
						checked={
							indexing.post_type_nofollowed
								? indexing.robots_follow
								: indexing.robots_nofollow
						}
						inverted={!indexing.post_type_nofollowed}
					></Toggle>
				</div>
				<div className="sui-form-field">
					<Toggle
						id="wds_meta-robots-noarchive"
						name="wds_meta-robots-adv[noarchive]"
						label={__('Archive', 'smartcrawl-seo')}
						description={__(
							'Instructs search engines to store a cached version of this page.',
							'smartcrawl-seo'
						)}
						checked={
							indexing &&
							indexing.robots_values &&
							indexing.robots_values.indexOf('noarchive') !== -1
						}
						inverted={true}
					></Toggle>
				</div>
				<div className="sui-form-field">
					<Toggle
						id="wds_meta-robots-nosnippet"
						name="wds_meta-robots-adv[nosnippet]"
						label={__('Snippet', 'smartcrawl-seo')}
						description={__(
							'Allows search engines to show a snippet of this page in the search results and prevents them from caching the page.',
							'smartcrawl-seo'
						)}
						checked={
							indexing &&
							indexing.robots_values &&
							indexing.robots_values.indexOf('nosnippet') !== -1
						}
						inverted={true}
					></Toggle>
				</div>
			</SettingsRow>
		);
	}
}
