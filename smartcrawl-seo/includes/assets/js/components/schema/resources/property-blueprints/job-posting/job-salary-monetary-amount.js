import { __ } from '@wordpress/i18n';
import currencies from '../currencies';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const JobSalaryMonetaryAmount = {
	currency: {
		id: id(),
		label: __('Currency', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'USD',
		customSources: {
			options: {
				label: __('Currencies', 'smartcrawl-seo'),
				values: currencies,
			},
		},
		description: __('The currency of the base salary.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	value: {
		id: id(),
		label: __('Currency', 'smartcrawl-seo'),
		type: 'QuantitativeValue',
		flatten: true,
		disallowDeletion: true,
		properties: {
			value: {
				id: id(),
				label: __('Value', 'smartcrawl-seo'),
				type: 'Number',
				source: 'number',
				value: '',
				disallowDeletion: true,
				description: __(
					'To specify a salary range, define a minValue and a maxValue, rather than a single value.',
					'smartcrawl-seo'
				),
			},
			minValue: {
				id: id(),
				label: __('Minimum Value', 'smartcrawl-seo'),
				type: 'Number',
				source: 'number',
				value: '',
				disallowDeletion: true,
				description: __(
					'Use in combination with maxValue to provide a salary range.',
					'smartcrawl-seo'
				),
			},
			maxValue: {
				id: id(),
				label: __('Maximum Value', 'smartcrawl-seo'),
				type: 'Number',
				source: 'number',
				value: '',
				disallowDeletion: true,
				description: __(
					'Use in combination with minValue to provide a salary range.',
					'smartcrawl-seo'
				),
			},
			unitText: {
				id: id(),
				label: __('Unit', 'smartcrawl-seo'),
				type: 'Text',
				source: 'options',
				value: 'HOUR',
				disallowDeletion: true,
				customSources: {
					options: {
						label: __('Unit', 'smartcrawl-seo'),
						values: {
							HOUR: __('Hour', 'smartcrawl-seo'),
							DAY: __('Day', 'smartcrawl-seo'),
							WEEK: __('Week', 'smartcrawl-seo'),
							MONTH: __('Month', 'smartcrawl-seo'),
							YEAR: __('Year', 'smartcrawl-seo'),
						},
					},
				},
			},
		},
	},
};
export default JobSalaryMonetaryAmount;
