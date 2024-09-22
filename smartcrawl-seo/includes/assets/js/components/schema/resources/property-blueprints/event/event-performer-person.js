import uniqueId from 'lodash-es/uniqueId';
import { __ } from '@wordpress/i18n';

const id = uniqueId;
const EventPerformerPerson = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'custom_text',
		value: '',
		description: __('The name of the person.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'custom_text',
		value: '',
		description: __("The URL to the person's profile.", 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'custom_text',
		value: '',
		optional: true,
		description: __(
			'Short bio/description of the person.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	image: {
		id: id(),
		label: __('Image', 'smartcrawl-seo'),
		type: 'ImageObject',
		source: 'image',
		value: '',
		description: __('The profile image of the person.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
};
export default EventPerformerPerson;
