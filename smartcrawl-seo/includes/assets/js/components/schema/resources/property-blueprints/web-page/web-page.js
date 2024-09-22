import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import WebPageOrganization from './web-page-organization';

const id = uniqueId;

const WebPage = {
	headline: {
		id: id(),
		label: __('Headline', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_title',
	},
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'post_data',
		value: 'post_permalink',
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_description',
	},
	primaryImageOfPage: {
		id: id(),
		label: __('Primary Image Of Page', 'smartcrawl-seo'),
		type: 'ImageObject',
		source: 'post_data',
		value: 'post_thumbnail',
	},
	thumbnailUrl: {
		id: id(),
		label: __('Thumbnail URL', 'smartcrawl-seo'),
		type: 'ImageURL',
		source: 'post_data',
		value: 'post_thumbnail_url',
	},
	lastReviewed: {
		id: id(),
		label: __('Last Reviewed', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'post_data',
		value: 'post_modified',
		optional: true,
	},
	dateModified: {
		id: id(),
		label: __('Date Modified', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'post_data',
		value: 'post_modified',
	},
	datePublished: {
		id: id(),
		label: __('Date Published', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'post_data',
		value: 'post_date',
	},
	articleBody: {
		id: id(),
		label: __('Article Body', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_content',
		optional: true,
	},
	alternativeHeadline: {
		id: id(),
		label: __('Alternative Headline', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		optional: true,
	},
	relatedLink: {
		id: id(),
		label: __('Related Link', 'smartcrawl-seo'),
		type: 'URL',
		source: 'custom_text',
		value: '',
		optional: true,
	},
	significantLink: {
		id: id(),
		label: __('Significant Link', 'smartcrawl-seo'),
		type: 'URL',
		source: 'custom_text',
		value: '',
		optional: true,
	},
	image: {
		id: id(),
		label: __('Images', 'smartcrawl-seo'),
		label_single: __('Image', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Image', 'smartcrawl-seo'),
				type: 'ImageObject',
				source: 'post_data',
				value: 'post_thumbnail',
			},
		},
	},
	author: {
		id: id(),
		label: __('Author', 'smartcrawl-seo'),
		type: 'Person',
		properties: {
			name: {
				id: id(),
				label: __('Name', 'smartcrawl-seo'),
				type: 'TextFull',
				source: 'author',
				value: 'author_full_name',
			},
			url: {
				id: id(),
				label: __('URL', 'smartcrawl-seo'),
				type: 'URL',
				source: 'author',
				value: 'author_url',
			},
			description: {
				id: id(),
				label: __('Description', 'smartcrawl-seo'),
				type: 'TextFull',
				source: 'author',
				value: 'author_description',
				optional: true,
			},
			image: {
				id: id(),
				label: __('Image', 'smartcrawl-seo'),
				type: 'ImageObject',
				source: 'author',
				value: 'author_gravatar',
			},
		},
	},
	publisher: {
		id: id(),
		label: __('Publisher', 'smartcrawl-seo'),
		type: 'Organization',
		properties: WebPageOrganization,
	},
};
export default WebPage;
