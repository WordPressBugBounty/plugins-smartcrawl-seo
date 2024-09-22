import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const BookPerson = {
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
		description: __("URL to the person's profile page.", 'smartcrawl-seo'),
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
export default BookPerson;
