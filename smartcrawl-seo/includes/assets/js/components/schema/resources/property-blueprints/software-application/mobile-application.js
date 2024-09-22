import merge from 'lodash-es/merge';
import SoftwareApplication from './software-application';
import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const MobileApplication = merge({}, SoftwareApplication, {
	carrierRequirements: {
		id: id(),
		label: __('Carrier Requirements', 'smartcrawl-seo'),
		description: __(
			'Specifies specific carrier(s) requirements for the application.',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
	},
});
export default MobileApplication;
