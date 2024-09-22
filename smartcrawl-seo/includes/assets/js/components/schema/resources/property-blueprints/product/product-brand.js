import uniqueId from 'lodash-es/uniqueId';
import { __ } from '@wordpress/i18n';

const id = uniqueId;
const ProductBrand = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'schema_settings',
		value: 'organization_name',
		description: __('The name of the brand.', 'smartcrawl-seo'),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'site_settings',
		value: 'site_url',
		description: __('The URL of the brand.', 'smartcrawl-seo'),
	},
	logo: {
		id: id(),
		label: __('Logo', 'smartcrawl-seo'),
		type: 'ImageObject',
		source: 'schema_settings',
		value: 'organization_logo',
		description: __('The logo of the brand.', 'smartcrawl-seo'),
		optional: true,
	},
};
export default ProductBrand;
