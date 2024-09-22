import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import RecipeHowToStepVideo from './recipe-how-to-step-video';
import RecipeClip from './recipe-clip';

const id = uniqueId;
const RecipeInstructionsHowToStep = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The word or short phrase summarizing the step (for example, "Preheat").',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	text: {
		id: id(),
		label: __('Text', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The full instruction text of this step.',
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
		description: __('An image for the step.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	url: {
		id: id(),
		label: __('Url', 'smartcrawl-seo'),
		type: 'URL',
		source: 'custom_text',
		value: '',
		description: __(
			'A URL that directly links to the step (if one is available). For example, an anchor link fragment.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	video: {
		id: id(),
		label: __('Video', 'smartcrawl-seo'),
		activeVersion: 'Video',
		properties: {
			Video: {
				id: id(),
				label: __('Video', 'smartcrawl-seo'),
				description: __('A video for this step.', 'smartcrawl-seo'),
				type: 'VideoObject',
				properties: RecipeHowToStepVideo,
				disallowDeletion: true,
				disallowAddition: true,
				isAnAltVersion: true,
			},
			Clip: {
				id: id(),
				label: __('Clip', 'smartcrawl-seo'),
				description: __('A clip for this step.', 'smartcrawl-seo'),
				type: 'Clip',
				properties: RecipeClip,
				disallowDeletion: true,
				disallowAddition: true,
				isAnAltVersion: true,
			},
		},
	},
};

export default RecipeInstructionsHowToStep;
