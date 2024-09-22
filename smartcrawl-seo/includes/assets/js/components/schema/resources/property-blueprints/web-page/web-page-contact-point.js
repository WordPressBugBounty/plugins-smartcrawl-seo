import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const WebPageContactPoint = {
	telephone: {
		id: id(),
		label: __('Phone Number', 'smartcrawl-seo'),
		type: 'Phone',
		source: 'schema_settings',
		value: 'organization_phone_number',
	},
	email: {
		id: id(),
		label: __('Email', 'smartcrawl-seo'),
		type: 'Email',
		source: 'site_settings',
		value: 'site_admin_email',
	},
	url: {
		id: id(),
		label: __('Contact URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'site_settings',
		value: 'site_url',
	},
	contactType: {
		id: id(),
		label: __('Contact Type', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'customer support',
		customSources: {
			options: {
				label: __('Contact Type', 'smartcrawl-seo'),
				values: {
					'customer support': __(
						'Customer Support',
						'smartcrawl-seo'
					),
					'technical support': __(
						'Technical Support',
						'smartcrawl-seo'
					),
					'billing support': __('Billing Support', 'smartcrawl-seo'),
					'bill payment': __('Bill payment', 'smartcrawl-seo'),
					sales: __('Sales', 'smartcrawl-seo'),
					reservations: __('Reservations', 'smartcrawl-seo'),
					'credit card support': __(
						'Credit Card Support',
						'smartcrawl-seo'
					),
					emergency: __('Emergency', 'smartcrawl-seo'),
					'baggage tracking': __(
						'Baggage Tracking',
						'smartcrawl-seo'
					),
					'roadside assistance': __(
						'Roadside Assistance',
						'smartcrawl-seo'
					),
					'package tracking': __(
						'Package Tracking',
						'smartcrawl-seo'
					),
				},
			},
		},
	},
};
export default WebPageContactPoint;
