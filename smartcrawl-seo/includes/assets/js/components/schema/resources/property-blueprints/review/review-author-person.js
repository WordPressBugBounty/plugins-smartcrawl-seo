import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const ReviewAuthorPerson = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'custom_text',
		value: '',
		description: __('The name of the review author.', 'smartcrawl-seo'),
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
		description: __('An image of the review author.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
};

export default ReviewAuthorPerson;
