import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const LocalAggregateRating = {
	itemReviewed: {
		id: id(),
		label: __('Reviewed Item', 'smartcrawl-seo'),
		flatten: true,
		properties: {
			name: {
				id: id(),
				label: __('Reviewed Item', 'smartcrawl-seo'),
				type: 'TextFull',
				source: 'site_settings',
				value: 'site_name',
				required: true,
				description: __(
					'Name of the item that is being rated. In this case the local business.',
					'smartcrawl-seo'
				),
			},
		},
		required: true,
	},
	ratingCount: {
		id: id(),
		label: __('Rating Count', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		customSources: {
			post_data: {
				label: __('Post Data', 'smartcrawl-seo'),
				values: {
					post_comment_count: __(
						'Post Comment Count',
						'smartcrawl-seo'
					),
				},
			},
		},
		required: true,
		description: __(
			'The total number of ratings for the local business.',
			'smartcrawl-seo'
		),
	},
	reviewCount: {
		id: id(),
		label: __('Review Count', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		customSources: {
			post_data: {
				label: __('Post Data', 'smartcrawl-seo'),
				values: {
					post_comment_count: __(
						'Post Comment Count',
						'smartcrawl-seo'
					),
				},
			},
		},
		required: true,
		description: __(
			'Specifies the number of people who provided a review with or without an accompanying rating.',
			'smartcrawl-seo'
		),
	},
	ratingValue: {
		id: id(),
		label: __('Rating Value', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		required: true,
		requiredInBlock: true,
		description: __(
			'A numerical quality rating for the local business, either a number, fraction, or percentage (for example, "4", "60%", or "6 / 10").',
			'smartcrawl-seo'
		),
	},
	bestRating: {
		id: id(),
		label: __('Best Rating', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The highest value allowed in this rating system. If omitted, 5 is assumed.',
			'smartcrawl-seo'
		),
	},
	worstRating: {
		id: id(),
		label: __('Worst Rating', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The lowest value allowed in this rating system. If omitted, 1 is assumed.',
			'smartcrawl-seo'
		),
	},
};

export default LocalAggregateRating;
