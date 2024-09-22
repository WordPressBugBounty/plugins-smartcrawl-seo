import { __ } from '@wordpress/i18n';
import EventPostalAddress from './event-postal-address';
import EventOrganizerContactPoint from './event-organizer-contact-point';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const EventOrganizerOrganization = {
	logo: {
		id: id(),
		label: __('Logo', 'smartcrawl-seo'),
		type: 'ImageObject',
		source: 'schema_settings',
		value: 'organization_logo',
		description: __('The logo of the organization.', 'smartcrawl-seo'),
	},
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'schema_settings',
		value: 'organization_name',
		description: __('The name of the organization.', 'smartcrawl-seo'),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'site_settings',
		value: 'site_url',
		description: __('The URL of the organization.', 'smartcrawl-seo'),
	},
	address: {
		id: id(),
		label: __('Addresses', 'smartcrawl-seo'),
		labelSingle: __('Address', 'smartcrawl-seo'),
		optional: true,
		description: __('The addresses of the organization.', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				type: 'PostalAddress',
				properties: EventPostalAddress,
			},
		},
	},
	contactPoint: {
		id: id(),
		label: __('Contact Points', 'smartcrawl-seo'),
		labelSingle: __('Contact Point', 'smartcrawl-seo'),
		optional: true,
		description: __(
			'The contact points of the organization.',
			'smartcrawl-seo'
		),
		properties: {
			0: {
				id: id(),
				type: 'ContactPoint',
				properties: EventOrganizerContactPoint,
			},
		},
	},
};
export default EventOrganizerOrganization;
