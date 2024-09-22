import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const ReviewAuthorOrganization = {
	logo: {
		id: id(),
		label: __('Logo', 'smartcrawl-seo'),
		type: 'ImageObject',
		source: 'image',
		value: '',
		description: __('The logo of the organization.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'custom_text',
		value: '',
		description: __('The name of the organization.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'custom_text',
		value: '',
		description: __('The URL of the organization.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
};

export default ReviewAuthorOrganization;
