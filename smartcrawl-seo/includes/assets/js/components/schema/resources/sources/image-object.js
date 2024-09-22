import { __ } from '@wordpress/i18n';

const ImageObject = {
	id: 'ImageObject',
	sources: {
		author: {
			label: __('Post Author', 'smartcrawl-seo'),
			values: {
				author_gravatar: __('Gravatar', 'smartcrawl-seo'),
			},
		},
		post_data: {
			label: __('Post Data', 'smartcrawl-seo'),
			values: {
				post_thumbnail: __('Featured Image', 'smartcrawl-seo'),
			},
		},
		post_meta: {
			label: __('Post Meta', 'smartcrawl-seo'),
		},
		schema_settings: {
			label: __('Schema Settings', 'smartcrawl-seo'),
			values: {
				organization_logo: __('Organization Logo', 'smartcrawl-seo'),
			},
		},
		image: {
			label: __('Custom Image', 'smartcrawl-seo'),
		},
	},
};
export default ImageObject;
