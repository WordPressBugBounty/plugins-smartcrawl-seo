import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import CourseInstructor from './course-instructor';
import CoursePlace from './course-place';
import CourseOffer from './course-offer';

const id = uniqueId;
const CourseInstance = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		description: __('The title of the course instance.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_description',
		description: __(
			'A description of the course instance.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'post_data',
		value: 'post_permalink',
		description: __('The URL of the course instance.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	courseMode: {
		id: id(),
		label: __('Course Mode', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The medium or means of delivery of the course instance or the mode of study, either as a text label (e.g. "online", "onsite" or "blended"; "synchronous" or "asynchronous"; "full-time" or "part-time").',
			'smartcrawl-seo'
		),
		placeholder: __('E.g. onsite', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	courseWorkload: {
		id: id(),
		label: __('Course Workload', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The amount of work expected of students taking the course, often provided as a figure per week or per month, and may be broken down by type. For example, "2 hours of lectures, 1 hour of lab work and 3 hours of independent study per week".',
			'smartcrawl-seo'
		),
		placeholder: __('E.g. 2 hours of lectures', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	eventStatus: {
		id: id(),
		label: __('Status', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'EventScheduled',
		customSources: {
			options: {
				label: __('Course Status', 'smartcrawl-seo'),
				values: {
					EventScheduled: __('Scheduled', 'smartcrawl-seo'),
					EventMovedOnline: __('Moved Online', 'smartcrawl-seo'),
					EventRescheduled: __('Rescheduled', 'smartcrawl-seo'),
					EventPostponed: __('Postponed', 'smartcrawl-seo'),
					EventCancelled: __('Cancelled', 'smartcrawl-seo'),
				},
			},
		},
		description: __('The status of the course.', 'smartcrawl-seo'),
		disallowDeletion: true,
	},
	eventAttendanceMode: {
		id: id(),
		label: __('Attendance Mode', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'MixedEventAttendanceMode',
		customSources: {
			options: {
				label: __('Event Attendance Mode', 'smartcrawl-seo'),
				values: {
					MixedEventAttendanceMode: __(
						'Mixed Attendance Mode',
						'smartcrawl-seo'
					),
					OfflineEventAttendanceMode: __(
						'Offline Attendance Mode',
						'smartcrawl-seo'
					),
					OnlineEventAttendanceMode: __(
						'Online Attendance Mode',
						'smartcrawl-seo'
					),
				},
			},
		},
		description: __(
			'Indicates whether the course will be conducted online, offline at a physical location, or a mix of both online and offline.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	startDate: {
		id: id(),
		label: __('Start Date', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		description: __(
			'The start date and start time of the course in ISO-8601 format.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	endDate: {
		id: id(),
		label: __('End Date', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		description: __(
			'The end date and end time of the course in ISO-8601 format.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
	},
	instructor: {
		id: id(),
		label: __('Instructors', 'smartcrawl-seo'),
		labelSingle: __('Instructor', 'smartcrawl-seo'),
		description: __(
			'A person assigned to instruct or provide instructional assistance for the course instance.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
		properties: {
			0: {
				id: id(),
				type: 'Person',
				disallowDeletion: true,
				disallowFirstItemDeletionOnly: true,
				properties: CourseInstructor,
			},
		},
	},
	image: {
		id: id(),
		label: __('Images', 'smartcrawl-seo'),
		labelSingle: __('Image', 'smartcrawl-seo'),
		description: __(
			'Images related to the course instance.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
		properties: {
			0: {
				id: id(),
				label: __('Image', 'smartcrawl-seo'),
				type: 'ImageObject',
				source: 'post_data',
				value: 'post_thumbnail',
				disallowDeletion: true,
				disallowFirstItemDeletionOnly: true,
			},
		},
	},
	location: {
		id: id(),
		label: __('Location', 'smartcrawl-seo'),
		activeVersion: 'Place',
		properties: {
			Place: {
				id: id(),
				label: __('Location', 'smartcrawl-seo'),
				type: 'Place',
				properties: CoursePlace,
				description: __(
					'The physical location where the course will be held.',
					'smartcrawl-seo'
				),
				disallowDeletion: true,
				disallowAddition: true,
				isAnAltVersion: true,
			},
			VirtualLocation: {
				id: id(),
				label: __('Virtual Location', 'smartcrawl-seo'),
				type: 'VirtualLocation',
				disallowAddition: true,
				disallowDeletion: true,
				isAnAltVersion: true,
				properties: {
					url: {
						id: id(),
						label: __('URL', 'smartcrawl-seo'),
						type: 'URL',
						source: 'post_data',
						disallowDeletion: true,
						value: 'post_permalink',
						description: __(
							'The URL of the web page, where people can attend the course.',
							'smartcrawl-seo'
						),
					},
				},
				description: __(
					'The virtual location of the course.',
					'smartcrawl-seo'
				),
			},
		},
	},
	offers: {
		id: id(),
		label: __('Price', 'smartcrawl-seo'),
		description: __('Price information for the course.', 'smartcrawl-seo'),
		properties: CourseOffer,
		disallowAddition: true,
		disallowDeletion: true,
	},
};
export default CourseInstance;
