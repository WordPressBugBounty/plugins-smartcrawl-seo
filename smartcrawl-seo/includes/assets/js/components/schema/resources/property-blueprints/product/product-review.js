import uniqueId from 'lodash-es/uniqueId';
import { __ } from '@wordpress/i18n';

const id = uniqueId;
const ProductReview = {
	itemReviewed: {
		id: id(),
		label: __('Reviewed Item', 'smartcrawl-seo'),
		flatten: true,
		required: true,
		properties: {
			name: {
				id: id(),
				label: __('Reviewed Item', 'smartcrawl-seo'),
				type: 'TextFull',
				source: 'post_data',
				value: 'post_title',
				disallowDeletion: true,
				required: true,
				description: __(
					'Name of the item that is being rated. In this case the product.',
					'smartcrawl-seo'
				),
			},
		},
	},
	reviewBody: {
		id: id(),
		label: __('Review Body', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		disallowDeletion: true,
		description: __('The actual body of the review.', 'smartcrawl-seo'),
	},
	datePublished: {
		id: id(),
		label: __('Date Published', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		disallowDeletion: true,
		description: __(
			'The date that the review was published, in ISO 8601 date format.',
			'smartcrawl-seo'
		),
	},
	author: {
		id: id(),
		label: __('Author', 'smartcrawl-seo'),
		activeVersion: 'Person',
		required: true,
		properties: {
			Person: {
				id: id(),
				label: __('Author', 'smartcrawl-seo'),
				disallowDeletion: true,
				disallowAddition: true,
				type: 'Person',
				properties: {
					name: {
						id: id(),
						label: __('Name', 'smartcrawl-seo'),
						type: 'TextFull',
						source: 'custom_text',
						value: '',
						description: __(
							'The name of the review author.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					url: {
						id: id(),
						label: __('URL', 'smartcrawl-seo'),
						type: 'URL',
						source: 'custom_text',
						value: '',
						description: __(
							"The URL to the review author's page.",
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					description: {
						id: id(),
						label: __('Description', 'smartcrawl-seo'),
						type: 'TextFull',
						source: 'custom_text',
						value: '',
						optional: true,
						description: __(
							'Short bio/description of the review author.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					image: {
						id: id(),
						label: __('Image', 'smartcrawl-seo'),
						type: 'ImageObject',
						source: 'image',
						value: '',
						description: __(
							'An image of the review author.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
				},
				required: true,
				description: __(
					"The author of the review. The reviewer's name must be a valid name.",
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
			Organization: {
				id: id(),
				label: __('Author Organization', 'smartcrawl-seo'),
				disallowDeletion: true,
				disallowAddition: true,
				type: 'Organization',
				properties: {
					logo: {
						id: id(),
						label: __('Logo', 'smartcrawl-seo'),
						type: 'ImageObject',
						source: 'image',
						value: '',
						description: __(
							'The logo of the organization.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					name: {
						id: id(),
						label: __('Name', 'smartcrawl-seo'),
						type: 'TextFull',
						source: 'custom_text',
						value: '',
						description: __(
							'The name of the organization.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					url: {
						id: id(),
						label: __('URL', 'smartcrawl-seo'),
						type: 'URL',
						source: 'custom_text',
						value: '',
						description: __(
							'The URL of the organization.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
				},
				required: true,
				description: __(
					"The author of the review. The reviewer's name must be a valid name.",
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
		},
	},
	reviewRating: {
		id: id(),
		label: __('Rating', 'smartcrawl-seo'),
		type: 'Rating',
		disallowAddition: true,
		disallowDeletion: true,
		properties: {
			ratingValue: {
				id: id(),
				label: __('Rating Value', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				disallowDeletion: true,
				description: __(
					'A numerical quality rating for the item, either a number, fraction, or percentage (for example, "4", "60%", or "6 / 10").',
					'smartcrawl-seo'
				),
				required: true,
			},
			bestRating: {
				id: id(),
				label: __('Best Rating', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				disallowDeletion: true,
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
				disallowDeletion: true,
				description: __(
					'The lowest value allowed in this rating system. If omitted, 1 is assumed.',
					'smartcrawl-seo'
				),
			},
		},
		required: true,
		description: __('The rating given in this review.', 'smartcrawl-seo'),
	},
};
export default ProductReview;
