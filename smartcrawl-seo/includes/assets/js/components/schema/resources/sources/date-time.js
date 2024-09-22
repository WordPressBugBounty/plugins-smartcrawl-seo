import { __ } from '@wordpress/i18n';

const DateTime = {
	id: 'DateTime',
	sources: {
		post_data: {
			label: __('Post Data', 'smartcrawl-seo'),
			values: {
				post_date: __('Post Date', 'smartcrawl-seo'),
				post_date_gmt: __('Post Date GMT', 'smartcrawl-seo'),
				post_modified: __('Post Modified', 'smartcrawl-seo'),
				post_modified_gmt: __('Post Modified GMT', 'smartcrawl-seo'),
			},
		},
		post_meta: {
			label: __('Post Meta', 'smartcrawl-seo'),
		},
		datetime: {
			label: __('Custom Date', 'smartcrawl-seo'),
		},
		custom_text: {
			label: __('Custom Text', 'smartcrawl-seo'),
		},
	},
};
export default DateTime;
