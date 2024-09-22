import merge from 'lodash-es/merge';
import uniqueId from 'lodash-es/uniqueId';
import { __ } from '@wordpress/i18n';
import SoftwareApplication from './software-application';

const id = uniqueId;
const WebApplication = merge({}, SoftwareApplication, {
	browserRequirements: {
		id: id(),
		label: __('Browser Requirements', 'smartcrawl-seo'),
		description: __(
			'Specifies browser requirements in human-readable text.',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
		placeholder: __('E.g. requires HTML5 support', 'smartcrawl-seo'),
	},
});
export default WebApplication;
