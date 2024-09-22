import { __ } from '@wordpress/i18n';

const TextFull = {
	id: 'TextFull',
	sources: {
		author: {
			label: __('Post Author', 'smartcrawl-seo'),
			values: {
				author_full_name: __('Full Name', 'smartcrawl-seo'),
				author_first_name: __('First Name', 'smartcrawl-seo'),
				author_last_name: __('Last Name', 'smartcrawl-seo'),
				author_description: __('Description', 'smartcrawl-seo'),
			},
		},
		post_data: {
			label: __('Post Data', 'smartcrawl-seo'),
			values: {
				post_title: __('Post Title', 'smartcrawl-seo'),
				post_content: __('Post Content', 'smartcrawl-seo'),
				post_excerpt: __('Post Excerpt', 'smartcrawl-seo'),
			},
		},
		post_meta: {
			label: __('Post Meta', 'smartcrawl-seo'),
		},
		schema_settings: {
			label: __('Schema Settings', 'smartcrawl-seo'),
			values: {
				organization_name: __('Organization Name', 'smartcrawl-seo'),
				organization_description: __(
					'Organization Description',
					'smartcrawl-seo'
				),
			},
		},
		seo_meta: {
			label: __('SEO Meta', 'smartcrawl-seo'),
			values: {
				seo_title: __('SEO Title', 'smartcrawl-seo'),
				seo_description: __('SEO Description', 'smartcrawl-seo'),
			},
		},
		site_settings: {
			label: __('Site Settings', 'smartcrawl-seo'),
			values: {
				site_name: __('Site Name', 'smartcrawl-seo'),
				site_description: __('Site Description', 'smartcrawl-seo'),
			},
		},
		custom_text: {
			label: __('Custom Text', 'smartcrawl-seo'),
		},
	},
};
export default TextFull;
