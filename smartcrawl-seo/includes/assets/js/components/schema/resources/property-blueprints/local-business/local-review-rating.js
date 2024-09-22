import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const LocalReviewRating = {
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
};
export default LocalReviewRating;
