import { __ } from '@wordpress/i18n';
import currencies from '../currencies';
import LocalPostalAddress from './local-postal-address';
import LocalAggregateRating from './local-aggregate-rating';
import LocalOpeningHoursSpecification from './local-opening-hours-specification';
import LocalReview from './local-review';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const LocalBusiness = {
	'@id': {
		id: id(),
		label: __('@id', 'smartcrawl-seo'),
		type: 'URL',
		source: 'site_settings',
		value: 'site_url',
		required: true,
		description: __(
			'Globally unique ID of the specific business location in the form of a URL. The ID should be stable and unchanging over time. Google Search treats the URL as an opaque string and it does not have to be a working link. If the business has multiple locations, make sure the @id is unique for each location.',
			'smartcrawl-seo'
		),
	},
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'site_settings',
		value: 'site_name',
		required: true,
		description: __('The name of the business.', 'smartcrawl-seo'),
	},
	logo: {
		id: id(),
		label: __('Logo', 'smartcrawl-seo'),
		type: 'ImageObject',
		source: 'schema_settings',
		value: 'organization_logo',
		description: __('The logo of the business.', 'smartcrawl-seo'),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'site_settings',
		value: 'site_url',
		description: __(
			'The fully-qualified URL of the specific business location. Unlike the @id property, this URL property should be a working link.',
			'smartcrawl-seo'
		),
	},
	priceRange: {
		id: id(),
		label: __('Price Range', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: '$',
		customSources: {
			options: {
				label: __('Price Range', 'smartcrawl-seo'),
				values: {
					$: '$',
					$$: '$$',
					$$$: __('$$$', 'smartcrawl-seo'),
				},
			},
		},
		description: __(
			'The relative price range of a business, commonly specified by either a numerical range (for example, "$10-15") or a normalized number of currency signs (for example, "$$$").',
			'smartcrawl-seo'
		),
	},
	telephone: {
		id: id(),
		label: __('Telephone', 'smartcrawl-seo'),
		type: 'Phone',
		source: 'schema_settings',
		value: 'organization_phone_number',
		description: __(
			'A business phone number meant to be the primary contact method for customers. Be sure to include the country code and area code in the phone number.',
			'smartcrawl-seo'
		),
	},
	currenciesAccepted: {
		id: id(),
		label: __('Currencies Accepted', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: ['USD'],
		allowMultipleSelection: true,
		customSources: {
			options: {
				label: __('Currencies', 'smartcrawl-seo'),
				values: currencies,
			},
		},
		description: __(
			'The currency accepted at the business.',
			'smartcrawl-seo'
		),
	},
	paymentAccepted: {
		id: id(),
		label: __('Payment Accepted', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: ['Cash'],
		allowMultipleSelection: true,
		customSources: {
			options: {
				label: __('Payment Accepted', 'smartcrawl-seo'),
				values: {
					Cash: __('Cash', 'smartcrawl-seo'),
					'Credit Card': __('Credit Card', 'smartcrawl-seo'),
					Cryptocurrency: __('Cryptocurrency', 'smartcrawl-seo'),
				},
			},
		},
		description: __(
			'Modes of payment accepted at the local business.',
			'smartcrawl-seo'
		),
	},
	address: {
		id: id(),
		label: __('Addresses', 'smartcrawl-seo'),
		labelSingle: __('Address', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				type: 'PostalAddress',
				properties: LocalPostalAddress,
			},
		},
		required: true,
		description: __(
			'The physical location of the business. Include as many properties as possible. The more properties you provide, the higher quality the result is to users.',
			'smartcrawl-seo'
		),
	},
	image: {
		id: id(),
		label: __('Images', 'smartcrawl-seo'),
		labelSingle: __('Image', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Image', 'smartcrawl-seo'),
				type: 'ImageObject',
				source: 'schema_settings',
				value: 'organization_logo',
			},
		},
		description: __(
			'One or more images of the local business.',
			'smartcrawl-seo'
		),
		required: true,
	},
	aggregateRating: {
		id: id(),
		label: __('Aggregate Rating', 'smartcrawl-seo'),
		type: 'AggregateRating',
		properties: LocalAggregateRating,
		description: __(
			'The average rating of the local business based on multiple ratings or reviews.',
			'smartcrawl-seo'
		),
	},
	geo: {
		id: id(),
		label: __('Geo Coordinates'),
		type: 'GeoCoordinates',
		disallowAddition: true,
		properties: {
			latitude: {
				id: id(),
				label: __('Latitude', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				disallowDeletion: true,
				description: __(
					'The latitude of the business location. The precision should be at least 5 decimal places.',
					'smartcrawl-seo'
				),
				placeholder: __('E.g. 37.42242', 'smartcrawl-seo'),
			},
			longitude: {
				id: id(),
				label: __('Longitude', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				disallowDeletion: true,
				description: __(
					'The longitude of the business location. The precision should be at least 5 decimal places.'
				),
				placeholder: __('E.g. -122.08585', 'smartcrawl-seo'),
			},
		},
		description: __(
			'Give search engines the exact location of your business by adding the geographic latitude and longitude coordinates.',
			'smartcrawl-seo'
		),
	},
	openingHoursSpecification: {
		id: id(),
		label: __('Opening Hours', 'smartcrawl-seo'),
		labelSingle: __('Opening Hours Specification', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Opening Hours'),
				type: 'OpeningHoursSpecification',
				disallowAddition: true,
				properties: LocalOpeningHoursSpecification,
			},
		},
		description: __(
			'Hours during which the business location is open.',
			'smartcrawl-seo'
		),
	},
	review: {
		id: id(),
		label: __('Reviews', 'smartcrawl-seo'),
		labelSingle: __('Review', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				type: 'Review',
				properties: LocalReview,
			},
		},
		description: __('Reviews of the local business.', 'smartcrawl-seo'),
		optional: true,
	},
};
export default LocalBusiness;
