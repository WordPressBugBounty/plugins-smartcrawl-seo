import { __ } from '@wordpress/i18n';
import { merge } from 'lodash-es';
import ProductBrand from './product-brand';

const WooBrand = merge({}, ProductBrand, {
	name: {
		source: 'woocommerce',
		value: 'product_category',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					product_category: __('Product Category', 'smartcrawl-seo'),
					product_tag: __('Product Tag', 'smartcrawl-seo'),
				},
			},
		},
	},
	url: {
		source: 'woocommerce',
		value: 'product_category_url',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					product_category_url: __(
						'Product Category URL',
						'smartcrawl-seo'
					),
					product_tag_url: __('Product Tag URL', 'smartcrawl-seo'),
				},
			},
		},
	},
	logo: {
		source: 'image',
		value: '',
	},
});

export default WooBrand;
