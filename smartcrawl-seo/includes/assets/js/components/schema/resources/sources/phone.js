import { __ } from '@wordpress/i18n';

const Phone = {
	id: 'Phone',
	sources: {
		post_meta: {
			label: __('Post Meta', 'smartcrawl-seo'),
		},
		schema_settings: {
			label: __('Schema Settings', 'smartcrawl-seo'),
			values: {
				organization_phone_number: __(
					'Organization Phone Number',
					'smartcrawl-seo'
				),
			},
		},
		custom_text: {
			label: __('Custom Phone', 'smartcrawl-seo'),
		},
	},
};
export default Phone;
