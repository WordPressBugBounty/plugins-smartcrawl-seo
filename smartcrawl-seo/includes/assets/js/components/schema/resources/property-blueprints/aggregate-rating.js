import uniqueId from 'lodash-es/uniqueId';
import { __ } from '@wordpress/i18n';

const id = uniqueId;
const AggregateRating = {
	itemReviewed: {
		id: id(),
		label: __('Reviewed Item', 'smartcrawl-seo'),
		flatten: true,
		properties: {
			name: {
				id: id(),
				label: __('Reviewed Item', 'smartcrawl-seo'),
				type: 'TextFull',
				source: 'post_data',
				value: 'post_title',
				required: true,
				description: __(
					'The name of the item that is being rated.',
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
			'The total number of ratings for the item on your site.',
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
		//requiredInBlock: true, // TODO: Not marking as required in block because I don't like the concept anymore. Maybe we need to get rid of requiredInBlock from other types as well.
		required: true,
		description: __(
			'A numerical quality rating for the item, either a number, fraction, or percentage (for example, "4", "60%", or "6 / 10").',
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
export default AggregateRating;
