import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const WebPagePostalAddress = {
	streetAddress: {
		id: id(),
		label: __('Street Address', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
	},
	addressLocality: {
		id: id(),
		label: __('Address Locality', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
	},
	addressRegion: {
		id: id(),
		label: __('Province/State', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
	},
	addressCountry: {
		id: id(),
		label: __('Country', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
	},
	postalCode: {
		id: id(),
		label: __('Postal Code', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
	},
	postOfficeBoxNumber: {
		id: id(),
		label: __('P.O. Box Number', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
	},
};
export default WebPagePostalAddress;
