import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import EventOffer from './event-offer';
import EventPlace from './event-place';
import EventAggregateOffer from './event-aggregate-offer';
import EventPerformerPerson from './event-performer-person';
import EventOrganizerOrganization from './event-organizer-organization';
import AggregateRating from '../aggregate-rating';
import Review from '../review/review';

const id = uniqueId;
const Event = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		required: true,
		description: __('The full title of the event.', 'smartcrawl-seo'),
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_description',
		description: __(
			'Description of the event. Describe all details of the event to make it easier for users to understand and attend the event.',
			'smartcrawl-seo'
		),
	},
	startDate: {
		id: id(),
		label: __('Start Date', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		required: true,
		description: __(
			'The start date and start time of the event in ISO-8601 format.',
			'smartcrawl-seo'
		),
	},
	endDate: {
		id: id(),
		label: __('End Date', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		description: __(
			'The end date and end time of the event in ISO-8601 format.',
			'smartcrawl-seo'
		),
	},
	eventAttendanceMode: {
		id: id(),
		label: __('Event Attendance Mode', 'smartcrawl-seo'),
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
			'Indicates whether the event occurs online, offline at a physical location, or a mix of both online and offline.',
			'smartcrawl-seo'
		),
	},
	eventStatus: {
		id: id(),
		label: __('Event Status', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'EventScheduled',
		customSources: {
			options: {
				label: __('Event Status', 'smartcrawl-seo'),
				values: {
					EventScheduled: __('Scheduled', 'smartcrawl-seo'),
					EventMovedOnline: __('Moved Online', 'smartcrawl-seo'),
					EventRescheduled: __('Rescheduled', 'smartcrawl-seo'),
					EventPostponed: __('Postponed', 'smartcrawl-seo'),
					EventCancelled: __('Cancelled', 'smartcrawl-seo'),
				},
			},
		},
		description: __('The status of the event.', 'smartcrawl-seo'),
	},
	image: {
		id: id(),
		label: __('Images', 'smartcrawl-seo'),
		labelSingle: __('Image', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Image', 'smartcrawl-seo'),
				type: 'ImageObject',
				source: 'image',
				value: '',
			},
		},
		description: __(
			'Image or logo for the event or tour. Including an image helps users understand and engage with your event.',
			'smartcrawl-seo'
		),
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
				properties: EventPlace,
				required: true,
				description: __(
					'The physical location of the event.',
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
			VirtualLocation: {
				id: id(),
				label: __('Virtual Location', 'smartcrawl-seo'),
				type: 'VirtualLocation',
				disallowAddition: true,
				properties: {
					url: {
						id: id(),
						label: __('URL', 'smartcrawl-seo'),
						type: 'URL',
						source: 'post_data',
						disallowDeletion: true,
						value: 'post_permalink',
						required: true,
						description: __(
							'The URL of the online event, where people can join. This property is required if your event is happening online.',
							'smartcrawl-seo'
						),
					},
				},
				required: true,
				description: __(
					'The virtual location of the event.',
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
		},
		required: true,
	},
	organizer: {
		id: id(),
		label: __('Organizer', 'smartcrawl-seo'),
		type: 'Organization',
		properties: EventOrganizerOrganization,
		description: __(
			'The organization that is hosting the event.',
			'smartcrawl-seo'
		),
	},
	performer: {
		id: id(),
		label: __('Performers', 'smartcrawl-seo'),
		labelSingle: __('Performer', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				type: 'Person',
				properties: EventPerformerPerson,
			},
		},
		description: __(
			'The participants performing at the event, such as artists and comedians.',
			'smartcrawl-seo'
		),
	},
	offers: {
		id: id(),
		label: __('Offers', 'smartcrawl-seo'),
		activeVersion: 'Offer',
		properties: {
			Offer: {
				id: id(),
				label: __('Offers', 'smartcrawl-seo'),
				labelSingle: __('Offer', 'smartcrawl-seo'),
				properties: {
					0: {
						id: id(),
						type: 'Offer',
						properties: EventOffer,
					},
				},
				description: __(
					'A nested Offer, one for each ticket type.',
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
			AggregateOffer: {
				id: id(),
				type: 'AggregateOffer',
				label: __('Aggregate Offer', 'smartcrawl-seo'),
				properties: EventAggregateOffer,
				description: __(
					'A nested AggregateOffer, representing all available offers.',
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
		},
	},
	aggregateRating: {
		id: id(),
		label: __('Aggregate Rating', 'smartcrawl-seo'),
		type: 'AggregateRating',
		properties: AggregateRating,
		description: __(
			'A nested aggregateRating of the event.',
			'smartcrawl-seo'
		),
		optional: true,
	},
	review: {
		id: id(),
		label: __('Reviews', 'smartcrawl-seo'),
		labelSingle: __('Review', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				type: 'Review',
				properties: Review,
			},
		},
		description: __('Reviews of the event.', 'smartcrawl-seo'),
		optional: true,
	},
};

export default Event;
