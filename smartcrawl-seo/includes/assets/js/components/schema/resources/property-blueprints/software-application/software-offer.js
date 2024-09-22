import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import currencies from '../currencies';
import merge from 'lodash-es/merge';

const id = uniqueId;
const SoftwareOffer = {
	price: {
		id: id(),
		label: __('Price Value', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		description: __(
			'The price of the software application. If the app is free of charge, set price to 0.',
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
			'The 3-letter ISO 4217 currency code. If the app has a price greater than 0, you must include currency.',
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
export default SoftwareOffer;
