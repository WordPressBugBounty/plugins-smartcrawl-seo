import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import ProductOffer from './product-offer';
import ProductAggregateOffer from './product-aggregate-offer';
import ProductAggregateRating from './product-aggregate-rating';
import ProductReview from './product-review';
import ProductOrganization from './product-organization';
import ProductBrand from './product-brand';

const id = uniqueId;
const Product = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		required: true,
		description: __('The name of the product.', 'smartcrawl-seo'),
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_description',
		description: __('The product description.', 'smartcrawl-seo'),
	},
	sku: {
		id: id(),
		label: __('SKU', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'Merchant-specific identifier for product.',
			'smartcrawl-seo'
		),
	},
	gtin: {
		id: id(),
		label: __('GTIN', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
		description: __(
			'A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes.',
			'smartcrawl-seo'
		),
	},
	gtin8: {
		id: id(),
		label: __('GTIN-8', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
		description: __(
			'The GTIN-8 code of the product. This code is also known as EAN/UCC-8 or 8-digit EAN.',
			'smartcrawl-seo'
		),
	},
	gtin12: {
		id: id(),
		label: __('GTIN-12', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
		description: __(
			'The GTIN-12 code of the product. The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C. Company Prefix, Item Reference, and Check Digit used to identify trade items.',
			'smartcrawl-seo'
		),
	},
	gtin13: {
		id: id(),
		label: __('GTIN-13', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
		description: __(
			'The GTIN-13 code of the product. This is equivalent to 13-digit ISBN codes and EAN UCC-13.',
			'smartcrawl-seo'
		),
	},
	gtin14: {
		id: id(),
		label: __('GTIN-14', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
		description: __('The GTIN-14 code of the product.', 'smartcrawl-seo'),
	},
	mpn: {
		id: id(),
		label: __('MPN', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
		description: __(
			'The Manufacturer Part Number (MPN) of the product.',
			'smartcrawl-seo'
		),
	},
	image: {
		id: id(),
		label: __('Images', 'smartcrawl-seo'),
		labelSingle: __('Image', 'smartcrawl-seo'),
		description: __(
			'The images associated with the product.',
			'smartcrawl-seo'
		),
		properties: {
			0: {
				id: id(),
				label: __('Image', 'smartcrawl-seo'),
				type: 'ImageObject',
				source: 'post_data',
				value: 'post_thumbnail',
			},
		},
	},
	brand: {
		id: id(),
		label: __('Brand', 'smartcrawl-seo'),
		activeVersion: 'Brand',
		properties: {
			Brand: {
				id: id(),
				label: __('Brand', 'smartcrawl-seo'),
				description: __('The brand of the product.', 'smartcrawl-seo'),
				type: 'Brand',
				properties: ProductBrand,
				isAnAltVersion: true,
			},
			Organization: {
				id: id(),
				label: __('Organization', 'smartcrawl-seo'),
				description: __('The brand of the product.', 'smartcrawl-seo'),
				type: 'Organization',
				properties: ProductOrganization,
				isAnAltVersion: true,
			},
		},
	},
	review: {
		id: id(),
		label: __('Reviews', 'smartcrawl-seo'),
		labelSingle: __('Review', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				type: 'Review',
				properties: ProductReview,
			},
		},
		required: true,
		requiredNotice: __(
			'This property is required by Google. You must include at least one of the following properties: review, aggregateRating or offers.',
			'smartcrawl-seo'
		),
		description: __('A nested Review of the product.', 'smartcrawl-seo'),
	},
	aggregateRating: {
		id: id(),
		label: __('Aggregate Rating', 'smartcrawl-seo'),
		type: 'AggregateRating',
		properties: ProductAggregateRating,
		required: true,
		requiredNotice: __(
			'This property is required by Google. You must include at least one of the following properties: review, aggregateRating or offers.',
			'smartcrawl-seo'
		),
		description: __(
			'A nested aggregateRating of the product.',
			'smartcrawl-seo'
		),
	},
	offers: {
		id: id(),
		label: __('Offers', 'smartcrawl-seo'),
		activeVersion: 'Offer',
		properties: {
			Offer: {
				id: id(),
				label: __('Offers', 'smartcrawl-seo'),
				labelSingle: __('Offer', 'smartcrawl-seo'),
				properties: {
					0: {
						id: id(),
						type: 'Offer',
						properties: ProductOffer,
					},
				},
				required: true,
				requiredNotice: __(
					'This property is required by Google. You must include at least one of the following properties: review, aggregateRating or offers.',
					'smartcrawl-seo'
				),
				description: __(
					'A nested Offer to sell the product.',
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
			AggregateOffer: {
				id: id(),
				type: 'AggregateOffer',
				label: __('Aggregate Offer', 'smartcrawl-seo'),
				properties: ProductAggregateOffer,
				required: true,
				requiredNotice: __(
					'This property is required by Google. You must include at least one of the following properties: review, aggregateRating or offers.',
					'smartcrawl-seo'
				),
				description: __(
					'A nested AggregateOffer to sell the product.',
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
		},
		required: true,
	},
};
export default Product;
