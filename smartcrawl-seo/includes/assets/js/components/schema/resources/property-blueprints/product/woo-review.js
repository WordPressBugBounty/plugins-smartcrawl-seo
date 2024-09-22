import { __ } from '@wordpress/i18n';
import { merge } from 'lodash-es';
import ProductReview from './product-review';

const WooReview = merge({}, ProductReview, {
	reviewBody: {
		source: 'woocommerce_review',
		value: 'comment_text',
		customSources: {
			woocommerce_review: {
				label: __('WooCommerce Review', 'smartcrawl-seo'),
				values: {
					comment_text: __('Review Text', 'smartcrawl-seo'),
				},
			},
		},
	},
	datePublished: {
		source: 'woocommerce_review',
		value: 'comment_date',
		customSources: {
			woocommerce_review: {
				label: __('WooCommerce Review', 'smartcrawl-seo'),
				values: {
					comment_date: __('Date Published', 'smartcrawl-seo'),
				},
			},
		},
	},
	author: {
		properties: {
			Person: {
				properties: {
					name: {
						source: 'woocommerce_review',
						value: 'comment_author_name',
						customSources: {
							woocommerce_review: {
								label: __(
									'WooCommerce Review',
									'smartcrawl-seo'
								),
								values: {
									comment_author_name: __(
										'Author Name',
										'smartcrawl-seo'
									),
								},
							},
						},
					},
				},
			},
			Organization: {
				properties: {
					name: {
						source: 'woocommerce_review',
						value: 'comment_author_name',
						customSources: {
							woocommerce_review: {
								label: __(
									'WooCommerce Review',
									'smartcrawl-seo'
								),
								values: {
									comment_author_name: __(
										'Author Name',
										'smartcrawl-seo'
									),
								},
							},
						},
					},
				},
			},
		},
	},
	reviewRating: {
		properties: {
			ratingValue: {
				source: 'woocommerce_review',
				value: 'rating_value',
				customSources: {
					woocommerce_review: {
						label: __('WooCommerce Review', 'smartcrawl-seo'),
						values: {
							rating_value: __('Rating Value', 'smartcrawl-seo'),
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
		},
	},
});

export default WooReview;
