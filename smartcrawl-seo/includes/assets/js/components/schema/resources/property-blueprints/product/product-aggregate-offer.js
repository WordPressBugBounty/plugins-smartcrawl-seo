import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import currencies from '../currencies';

const id = uniqueId;
const ProductAggregateOffer = {
	availability: {
		id: id(),
		label: __('Availability', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'InStock',
		customSources: {
			options: {
				label: __('Availability', 'smartcrawl-seo'),
				values: {
					InStock: __('In Stock', 'smartcrawl-seo'),
					SoldOut: __('Sold Out', 'smartcrawl-seo'),
					PreOrder: __('PreOrder', 'smartcrawl-seo'),
				},
			},
		},
		description: __('The availability of this item.', 'smartcrawl-seo'),
	},
	lowPrice: {
		id: id(),
		label: __('Low Price', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		required: true,
		description: __(
			'The lowest price of all offers available. Use a floating point number.',
			'smartcrawl-seo'
		),
	},
	highPrice: {
		id: id(),
		label: __('High Price', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		description: __(
			'The highest price of all offers available. Use a floating point number.',
			'smartcrawl-seo'
		),
	},
	priceCurrency: {
		id: id(),
		label: __('Price Currency', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'USD',
		customSources: {
			options: {
				label: __('Currencies', 'smartcrawl-seo'),
				values: currencies,
			},
		},
		required: true,
		description: __(
			'The currency used to describe the price, in three-letter ISO 4217 format.',
			'smartcrawl-seo'
		),
	},
	offerCount: {
		id: id(),
		label: __('Offer Count', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		description: __('The number of offers for the item.', 'smartcrawl-seo'),
	},
};
export default ProductAggregateOffer;
