import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const EventOrganizerContactPoint = {
	telephone: {
		id: id(),
		label: __('Phone Number', 'smartcrawl-seo'),
		type: 'Phone',
		source: 'schema_settings',
		value: 'organization_phone_number',
		description: __('The telephone number.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	email: {
		id: id(),
		label: __('Email', 'smartcrawl-seo'),
		type: 'Email',
		source: 'site_settings',
		value: 'site_admin_email',
		description: __('The email address.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	url: {
		id: id(),
		label: __('Contact URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'site_settings',
		value: 'site_url',
		description: __('The contact URL.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	contactType: {
		id: id(),
		label: __('Contact Type', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'customer support',
		description: __(
			'A person or organization can have different contact points, for different purposes. For example, a sales contact point, a PR contact point and so on. This property is used to specify the kind of contact point.',
			'smartcrawl-seo'
		),
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
		disallowDeletion: true,
	},
};
export default EventOrganizerContactPoint;
