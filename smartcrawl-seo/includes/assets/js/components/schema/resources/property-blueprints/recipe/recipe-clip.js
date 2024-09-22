import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const RecipeClip = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __('The name of the clip.', 'smartcrawl-seo'),
		required: true,
		disallowDeletion: true,
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'custom_text',
		value: '',
		description: __('A link to the start of the clip.', 'smartcrawl-seo'),
		required: true,
		disallowDeletion: true,
	},
	startOffset: {
		id: id(),
		label: __('Start Offset', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		description: __(
			'The start time of the clip expressed as the number of seconds from the beginning of the video.',
			'smartcrawl-seo'
		),
		required: true,
		disallowDeletion: true,
	},
	endOffset: {
		id: id(),
		label: __('End Offset', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		description: __(
			'The end time of the clip expressed as the number of seconds from the beginning of the video.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
};
export default RecipeClip;
