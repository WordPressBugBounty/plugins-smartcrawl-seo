import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import SoftwareOffer from './software-offer';
import SoftwareAggregateRating from './software-aggregate-rating';
import SoftwareReview from './software-review';

const id = uniqueId;
const SoftwareApplication = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		description: __('The name of the app.', 'smartcrawl-seo'),
		required: true,
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_description',
		description: __('The description of the app.', 'smartcrawl-seo'),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'post_data',
		value: 'post_permalink',
		description: __('The permanent URL of the app.', 'smartcrawl-seo'),
	},
	applicationCategory: {
		id: id(),
		label: __('Application Category', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: '',
		customSources: {
			options: {
				label: __('Application Category', 'smartcrawl-seo'),
				values: {
					'': __('None', 'smartcrawl-seo'),
					GameApplication: __('Game Application', 'smartcrawl-seo'),
					SocialNetworkingApplication: __(
						'Social Networking Application',
						'smartcrawl-seo'
					),
					TravelApplication: __(
						'Travel Application',
						'smartcrawl-seo'
					),
					ShoppingApplication: __(
						'Shopping Application',
						'smartcrawl-seo'
					),
					SportsApplication: __(
						'Sports Application',
						'smartcrawl-seo'
					),
					LifestyleApplication: __(
						'Lifestyle Application',
						'smartcrawl-seo'
					),
					BusinessApplication: __(
						'Business Application',
						'smartcrawl-seo'
					),
					DesignApplication: __(
						'Design Application',
						'smartcrawl-seo'
					),
					DeveloperApplication: __(
						'Developer Application',
						'smartcrawl-seo'
					),
					DriverApplication: __(
						'Driver Application',
						'smartcrawl-seo'
					),
					EducationalApplication: __(
						'Educational Application',
						'smartcrawl-seo'
					),
					HealthApplication: __(
						'Health Application',
						'smartcrawl-seo'
					),
					FinanceApplication: __(
						'Finance Application',
						'smartcrawl-seo'
					),
					SecurityApplication: __(
						'Security Application',
						'smartcrawl-seo'
					),
					BrowserApplication: __(
						'Browser Application',
						'smartcrawl-seo'
					),
					CommunicationApplication: __(
						'Communication Application',
						'smartcrawl-seo'
					),
					DesktopEnhancementApplication: __(
						'Desktop Enhancement Application',
						'smartcrawl-seo'
					),
					EntertainmentApplication: __(
						'Entertainment Application',
						'smartcrawl-seo'
					),
					MultimediaApplication: __(
						'Multimedia Application',
						'smartcrawl-seo'
					),
					HomeApplication: __('Home Application', 'smartcrawl-seo'),
					UtilitiesApplication: __(
						'Utilities Application',
						'smartcrawl-seo'
					),
					ReferenceApplication: __(
						'Reference Application',
						'smartcrawl-seo'
					),
				},
			},
		},
		description: __(
			'The type of app (for example, BusinessApplication or GameApplication). The value must be a supported app type.',
			'smartcrawl-seo'
		),
	},
	operatingSystem: {
		id: id(),
		label: __('Operating System', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The operating system(s) required to use the app (for example, Windows 7, OSX 10.6, Android 1.6).',
			'smartcrawl-seo'
		),
		placeholder: __('E.g. Android 1.6', 'smartcrawl-seo'),
	},
	screenshot: {
		id: id(),
		label: __('Screenshots', 'smartcrawl-seo'),
		labelSingle: __('Screenshot', 'smartcrawl-seo'),
		description: __('Screenshots of the app.', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Screenshot', 'smartcrawl-seo'),
				type: 'ImageObject',
				source: 'post_data',
				value: 'post_thumbnail',
			},
		},
	},
	offers: {
		id: id(),
		label: __('Price', 'smartcrawl-seo'),
		description: __('Price information for the app.', 'smartcrawl-seo'),
		properties: SoftwareOffer,
		disallowAddition: true,
	},
	aggregateRating: {
		id: id(),
		label: __('Aggregate Rating', 'smartcrawl-seo'),
		type: 'AggregateRating',
		properties: SoftwareAggregateRating,
		description: __(
			'A nested aggregateRating of the app.',
			'smartcrawl-seo'
		),
		required: true,
		requiredNotice: __(
			'This property is required by Google. You must include at least one of the following properties: review or aggregateRating.',
			'smartcrawl-seo'
		),
	},
	review: {
		id: id(),
		label: __('Reviews', 'smartcrawl-seo'),
		labelSingle: __('Review', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				type: 'Review',
				properties: SoftwareReview,
			},
		},
		description: __('Reviews of the app.', 'smartcrawl-seo'),
		required: true,
		requiredNotice: __(
			'This property is required by Google. You must include at least one of the following properties: review or aggregateRating.',
			'smartcrawl-seo'
		),
	},
	softwareVersion: {
		id: id(),
		label: __('Software Version', 'smartcrawl-seo'),
		description: __('Version of the software instance.', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. 1.0.1', 'smartcrawl-seo'),
		optional: true,
	},
	releaseNotes: {
		id: id(),
		label: __('Release Notes', 'smartcrawl-seo'),
		description: __(
			'Description of what changed in this version.',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
	},
	downloadUrl: {
		id: id(),
		label: __('Download URL', 'smartcrawl-seo'),
		description: __(
			'If the file can be downloaded, URL to download the binary.',
			'smartcrawl-seo'
		),
		type: 'URL',
		source: 'custom_text',
		value: '',
		optional: true,
	},
	installUrl: {
		id: id(),
		label: __('Install URL', 'smartcrawl-seo'),
		description: __(
			'URL at which the app may be installed, if different from the URL of the item.',
			'smartcrawl-seo'
		),
		type: 'URL',
		source: 'custom_text',
		value: '',
		optional: true,
	},
	featureList: {
		id: id(),
		label: __('Feature List', 'smartcrawl-seo'),
		description: __(
			'Features or modules provided by this application.',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
	},
	fileSize: {
		id: id(),
		label: __('File Size', 'smartcrawl-seo'),
		description: __(
			'Size of the application / package (e.g. 18MB). In the absence of a unit (MB, KB etc.), KB will be assumed.',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. 18MB', 'smartcrawl-seo'),
		optional: true,
	},
	memoryRequirements: {
		id: id(),
		label: __('Memory Requirements', 'smartcrawl-seo'),
		description: __('Minimum memory requirements.', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
	},
	storageRequirements: {
		id: id(),
		label: __('Storage Requirements'),
		description: __(
			'Storage requirements (free space required).',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. 21MB', 'smartcrawl-seo'),
		optional: true,
	},
	processorRequirements: {
		id: id(),
		label: __('Processor Requirements', 'smartcrawl-seo'),
		description: __(
			'Processor architecture required to run the application (e.g. IA64).',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. IA64', 'smartcrawl-seo'),
		optional: true,
	},
	softwareRequirements: {
		id: id(),
		label: __('Software Requirements', 'smartcrawl-seo'),
		description: __(
			'Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (Examples: DirectX, Java or .NET runtime).',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. DirectX', 'smartcrawl-seo'),
		optional: true,
	},
	permissions: {
		id: id(),
		label: __('Permissions', 'smartcrawl-seo'),
		description: __(
			'Permission(s) required to run the app (for example, a mobile app may require full internet access or may run only on wifi).',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
	},
	applicationSuite: {
		id: id(),
		label: __('Application Suite', 'smartcrawl-seo'),
		description: __(
			'The name of the application suite to which the application belongs (e.g. Excel belongs to Office).',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. Microsoft Office', 'smartcrawl-seo'),
		optional: true,
	},
	availableOnDevice: {
		id: id(),
		label: __('Available On Device', 'smartcrawl-seo'),
		description: __(
			'Device required to run the application. Used in cases where a specific make/model is required to run the application.',
			'smartcrawl-seo'
		),
		type: 'Text',
		source: 'custom_text',
		value: '',
		optional: true,
	},
};
export default SoftwareApplication;
