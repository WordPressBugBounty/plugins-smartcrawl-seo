import { __ } from '@wordpress/i18n';
import { merge } from 'lodash-es';
import ProductOrganization from './product-organization';

const WooOrganization = merge({}, ProductOrganization, {
	name: {
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

export default WooOrganization;
