import uniqueId from 'lodash-es/uniqueId';
import { __ } from '@wordpress/i18n';
import CoursePlacePostalAddress from './course-place-postal-address';

const id = uniqueId;
const CoursePlace = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'custom_text',
		value: '',
		description: __(
			'The detailed name of the place or venue where the course is being held.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	address: {
		id: id(),
		label: __('Address', 'smartcrawl-seo'),
		type: 'PostalAddress',
		properties: CoursePlacePostalAddress,
		description: __(
			"The venue's detailed street address.",
			'smartcrawl-seo'
		),
		disallowDeletion: true,
		disallowAddition: true,
	},
};
export default CoursePlace;
