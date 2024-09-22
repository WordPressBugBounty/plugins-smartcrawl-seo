import { merge } from 'lodash-es';
import { __ } from '@wordpress/i18n';
import ProductAggregateOffer from './product-aggregate-offer';

const WooAggregateOffer = merge({}, ProductAggregateOffer, {
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
	lowPrice: {
		source: 'woocommerce',
		value: 'min_price',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					min_price: __(
						'Variable Product Minimum Price',
						'smartcrawl-seo'
					),
				},
			},
		},
	},
	highPrice: {
		source: 'woocommerce',
		value: 'max_price',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					max_price: __(
						'Variable Product Maximum Price',
						'smartcrawl-seo'
					),
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
	offerCount: {
		source: 'woocommerce',
		value: 'product_children_count',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					product_children_count: __(
						'Number of Variations',
						'smartcrawl-seo'
					),
				},
			},
		},
	},
});

export default WooAggregateOffer;
