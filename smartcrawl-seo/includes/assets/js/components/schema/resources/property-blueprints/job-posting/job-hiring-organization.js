import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const JobHiringOrganization = {
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
		required: true,
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'site_settings',
		value: 'site_url',
		description: __('The URL of the organization.', 'smartcrawl-seo'),
	},
	sameAs: {
		id: id(),
		label: __('Same As', 'smartcrawl-seo'),
		labelSingle: __('URL', 'smartcrawl-seo'),
		description: __(
			"URL of reference web pages that unambiguously indicate the item's identity.",
			'smartcrawl-seo'
		),
		properties: {
			0: {
				id: id(),
				label: __('URL', 'smartcrawl-seo'),
				type: 'URL',
				source: 'custom_text',
				value: '',
			},
		},
	},
};
export default JobHiringOrganization;
