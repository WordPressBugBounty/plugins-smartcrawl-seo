import merge from 'lodash-es/merge';
import RecipeVideoBasic from './recipe-video-basic';
import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import RecipeClip from './recipe-clip';

const id = uniqueId;
const RecipeVideo = merge({}, RecipeVideoBasic, {
	thumbnailUrl: {
		id: id(),
		label: __('Thumbnail URLs', 'smartcrawl-seo'),
		labelSingle: __('Thumbnail URL', 'smartcrawl-seo'),
		description: __(
			'URLs pointing to the video thumbnail image files. Images must be 60px x 30px, at minimum.',
			'smartcrawl-seo'
		),
		required: true,
		properties: {
			0: {
				id: id(),
				label: __('Thumbnail URL', 'smartcrawl-seo'),
				type: 'ImageURL',
				source: 'image_url',
				value: '',
			},
		},
	},
	hasPart: {
		id: id(),
		label: __('Clips', 'smartcrawl-seo'),
		labelSingle: __('Clip', 'smartcrawl-seo'),
		description: __(
			'Video clips that are included within the full video.',
			'smartcrawl-seo'
		),
		properties: {
			0: {
				id: id(),
				type: 'Clip',
				properties: RecipeClip,
			},
		},
	},
});

export default RecipeVideo;
