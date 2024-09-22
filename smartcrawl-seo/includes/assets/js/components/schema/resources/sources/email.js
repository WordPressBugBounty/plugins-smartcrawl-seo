import { __ } from '@wordpress/i18n';

const Email = {
	id: 'Email',
	sources: {
		author: {
			label: __('Post Author', 'smartcrawl-seo'),
			values: {
				author_email: __('Email', 'smartcrawl-seo'),
			},
		},
		post_meta: {
			label: __('Post Meta', 'smartcrawl-seo'),
		},
		site_settings: {
			label: __('Site Settings', 'smartcrawl-seo'),
			values: {
				site_admin_email: __('Site Admin Email', 'smartcrawl-seo'),
			},
		},
		custom_text: {
			label: __('Custom Email', 'smartcrawl-seo'),
		},
	},
};
export default Email;
