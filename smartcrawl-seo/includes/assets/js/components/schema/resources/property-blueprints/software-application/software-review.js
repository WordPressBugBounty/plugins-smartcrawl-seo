import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import ReviewAuthorPerson from '../review/review-author-person';
import ReviewAuthorOrganization from '../review/review-author-organization';
import ReviewRating from '../review/review-rating';

const id = uniqueId;
const SoftwareReview = {
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
				source: 'custom_text',
				value: '',
				disallowDeletion: true,
				required: true,
				description: __(
					'Name of the item that is being rated.',
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
				properties: ReviewAuthorPerson,
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
				properties: ReviewAuthorOrganization,
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
		description: __('The rating given in this review.', 'smartcrawl-seo'),
		type: 'Rating',
		disallowAddition: true,
		disallowDeletion: true,
		required: true,
		properties: ReviewRating,
	},
};

export default SoftwareReview;
