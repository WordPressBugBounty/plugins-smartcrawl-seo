import { __ } from '@wordpress/i18n';
import { merge } from 'lodash-es';
import ProductOffer from './product-offer';

const WooOffer = merge({}, ProductOffer, {
	availability: {
		source: 'woocommerce',
		value: 'stock_status',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					stock_status: __('Stock Status', 'smartcrawl-seo'),
				},
			},
		},
	},
	price: {
		source: 'woocommerce',
		value: 'price',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					price: __('Price', 'smartcrawl-seo'),
				},
			},
		},
	},
	priceCurrency: {
		source: 'woocommerce',
		value: 'currency',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					currency: __('Currency', 'smartcrawl-seo'),
				},
			},
		},
	},
	validFrom: {
		source: 'woocommerce',
		value: 'date_on_sale_from',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					date_on_sale_from: __(
						'Product Sale Start Date',
						'smartcrawl-seo'
					),
				},
			},
		},
	},
	priceValidUntil: {
		source: 'woocommerce',
		value: 'date_on_sale_to',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					date_on_sale_to: __(
						'Product Sale End Date',
						'smartcrawl-seo'
					),
				},
			},
		},
	},
});

export default WooOffer;
