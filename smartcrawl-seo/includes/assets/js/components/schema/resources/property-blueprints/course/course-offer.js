import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import currencies from '../currencies';
import merge from 'lodash-es/merge';

const id = uniqueId;
const CourseOffer = {
	price: {
		id: id(),
		label: __('Price Value', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		description: __(
			'The price for attending this course.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	priceCurrency: {
		id: id(),
		label: __('Price Currency Code', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: '',
		description: __(
			'The 3-letter ISO 4217 currency code.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
		customSources: {
			options: {
				label: __('Currencies', 'smartcrawl-seo'),
				values: merge({ '': __('None', 'smartcrawl-seo') }, currencies),
			},
		},
	},
};
export default CourseOffer;
