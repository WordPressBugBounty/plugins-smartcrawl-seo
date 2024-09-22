import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const JobApplicantLocationRequirement = {
	'@type': {
		id: id(),
		label: __('Administrative Area Type', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'Country',
		disallowDeletion: true,
		customSources: {
			options: {
				label: __('Administrative Area Type', 'smartcrawl-seo'),
				values: {
					Country: __('Country', 'smartcrawl-seo'),
					City: __('City', 'smartcrawl-seo'),
					State: __('State', 'smartcrawl-seo'),
				},
			},
		},
	},
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The name of the administrative area.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
};
export default JobApplicantLocationRequirement;
