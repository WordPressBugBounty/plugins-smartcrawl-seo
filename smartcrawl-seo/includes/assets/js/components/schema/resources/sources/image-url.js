import { __ } from '@wordpress/i18n';

const ImageURL = {
	id: 'ImageURL',
	sources: {
		author: {
			label: __('Post Author', 'smartcrawl-seo'),
			values: {
				author_gravatar_url: __('Gravatar URL', 'smartcrawl-seo'),
			},
		},
		post_data: {
			label: __('Post Data', 'smartcrawl-seo'),
			values: {
				post_thumbnail_url: __('Featured Image URL', 'smartcrawl-seo'),
			},
		},
		post_meta: {
			label: __('Post Meta', 'smartcrawl-seo'),
		},
		schema_settings: {
			label: __('Schema Settings', 'smartcrawl-seo'),
			values: {
				organization_logo_url: __(
					'Organization Logo URL',
					'smartcrawl-seo'
				),
			},
		},
		image_url: {
			label: __('Custom Image URL', 'smartcrawl-seo'),
		},
		custom_text: {
			label: __('Custom URL', 'smartcrawl-seo'),
		},
	},
};
export default ImageURL;
