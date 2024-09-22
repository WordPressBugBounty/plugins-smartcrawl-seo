import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const EventOffer = {
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
		description: __('The availability of event tickets.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	price: {
		id: id(),
		label: __('Price', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		description: __(
			"The lowest available price available for your tickets, including service charges and fees. Don't forget to update it as prices change or tickets sell out.",
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	priceCurrency: {
		id: id(),
		label: __('Price Currency Code', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The 3-letter ISO 4217 currency code.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	validFrom: {
		id: id(),
		label: __('Valid From', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		description: __(
			'The date and time when tickets go on sale (only required on date-restricted offers), in ISO-8601 format.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	priceValidUntil: {
		id: id(),
		label: __('Valid Until', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		description: __(
			'The date and time till when tickets will be on sale.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'post_data',
		value: 'post_permalink',
		description: __(
			'The URL of a page providing the ability to buy tickets.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
};

export default EventOffer;
