import { merge } from 'lodash-es';
import { __ } from '@wordpress/i18n';
import ProductAggregateRating from './product-aggregate-rating';

const WooAggregateRating = merge({}, ProductAggregateRating, {
	ratingCount: {
		source: 'woocommerce',
		value: 'review_count',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					review_count: __('Review Count', 'smartcrawl-seo'),
				},
			},
		},
	},
	reviewCount: {
		source: 'woocommerce',
		value: 'review_count',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					review_count: __('Review Count', 'smartcrawl-seo'),
				},
			},
		},
	},
	ratingValue: {
		source: 'woocommerce',
		value: 'average_rating',
		customSources: {
			woocommerce: {
				label: __('WooCommerce', 'smartcrawl-seo'),
				values: {
					average_rating: __('Average Rating', 'smartcrawl-seo'),
				},
			},
		},
	},
	bestRating: {
		value: '5',
	},
	worstRating: {
		value: '1',
	},
});

export default WooAggregateRating;
