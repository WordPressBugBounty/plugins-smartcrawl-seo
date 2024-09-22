import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const HowToMonetaryAmount = {
	value: {
		id: id(),
		label: __('Value', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		disallowDeletion: true,
		description: __('The monetary amount value.', 'smartcrawl-seo'),
	},
	currency: {
		id: id(),
		label: __('Currency', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		disallowDeletion: true,
		description: __(
			'The currency in which the monetary amount is expressed.',
			'smartcrawl-seo'
		),
	},
	maxValue: {
		id: id(),
		label: __('Max Value', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		disallowDeletion: true,
		description: __('The upper limit of the value.', 'smartcrawl-seo'),
	},
	minValue: {
		id: id(),
		label: __('Min Value', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		disallowDeletion: true,
		description: __('The lower limit of the value.', 'smartcrawl-seo'),
	},
};
export default HowToMonetaryAmount;
