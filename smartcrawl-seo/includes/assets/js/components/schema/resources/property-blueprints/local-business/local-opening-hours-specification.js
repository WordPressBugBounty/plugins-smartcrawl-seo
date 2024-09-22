import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import time from './local-time';

const id = uniqueId;
const LocalOpeningHoursSpecification = {
	dayOfWeek: {
		id: id(),
		label: __('Days of Week', 'smartcrawl-seo'),
		disallowDeletion: true,
		type: 'Array',
		allowMultipleSelection: true,
		source: 'options',
		value: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
		customSources: {
			options: {
				label: __('Days of Week', 'smartcrawl-seo'),
				values: {
					Monday: __('Monday', 'smartcrawl-seo'),
					Tuesday: __('Tuesday', 'smartcrawl-seo'),
					Wednesday: __('Wednesday', 'smartcrawl-seo'),
					Thursday: __('Thursday', 'smartcrawl-seo'),
					Friday: __('Friday', 'smartcrawl-seo'),
					Saturday: __('Saturday', 'smartcrawl-seo'),
					Sunday: __('Sunday', 'smartcrawl-seo'),
				},
			},
		},
		description: __('One or more days of the week.', 'smartcrawl-seo'),
	},
	opens: {
		id: id(),
		label: __('Opens', 'smartcrawl-seo'),
		type: 'Text',
		disallowDeletion: true,
		source: 'options',
		value: '09:00',
		description: __(
			'The time the business location opens, in hh:mm:ss format.',
			'smartcrawl-seo'
		),
		customSources: {
			options: {
				label: __('Time', 'smartcrawl-seo'),
				values: time,
			},
		},
	},
	closes: {
		id: id(),
		label: __('Closes', 'smartcrawl-seo'),
		type: 'Text',
		disallowDeletion: true,
		source: 'options',
		value: '21:00',
		description: __(
			'The time the business location closes, in hh:mm:ss format.',
			'smartcrawl-seo'
		),
		customSources: {
			options: {
				label: __('Time', 'smartcrawl-seo'),
				values: time,
			},
		},
	},
};
export default LocalOpeningHoursSpecification;
