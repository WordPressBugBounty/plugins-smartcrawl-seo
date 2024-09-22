import { __ } from '@wordpress/i18n';

const URL = {
	id: 'URL',
	sources: {
		author: {
			label: __('Post Author', 'smartcrawl-seo'),
			values: {
				author_url: __('Profile URL', 'smartcrawl-seo'),
			},
		},
		post_data: {
			label: __('Post Data', 'smartcrawl-seo'),
			values: {
				post_permalink: __('Post Permalink', 'smartcrawl-seo'),
			},
		},
		post_meta: {
			label: __('Post Meta', 'smartcrawl-seo'),
		},
		site_settings: {
			label: __('Site Settings', 'smartcrawl-seo'),
			values: {
				site_url: __('Site URL', 'smartcrawl-seo'),
			},
		},
		custom_text: {
			label: __('Custom URL', 'smartcrawl-seo'),
		},
	},
};
export default URL;
