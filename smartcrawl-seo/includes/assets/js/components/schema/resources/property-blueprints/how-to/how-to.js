import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import HowToMonetaryAmount from './how-to-monetary-amount';
import HowToComment from './how-to-comment';
import AggregateRating from '../aggregate-rating';
import Review from '../review/review';

const id = uniqueId;
const HowTo = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		required: true,
		description: __(
			'The title of the how-to. For example, "How to tie a tie".',
			'smartcrawl-seo'
		),
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_description',
		description: __('A description of the how-to.', 'smartcrawl-seo'),
	},
	totalTime: {
		id: id(),
		label: __('Total Time', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		description: __(
			'The total time required to perform all instructions or directions (including time to prepare the supplies), in ISO 8601 duration format.',
			'smartcrawl-seo'
		),
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
				source: 'post_data',
				value: 'post_thumbnail',
			},
		},
		description: __('Images of the completed how-to.', 'smartcrawl-seo'),
	},
	supply: {
		id: id(),
		label: __('Supplies', 'smartcrawl-seo'),
		labelSingle: __('Supply', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Supply', 'smartcrawl-seo'),
				type: 'HowToSupply',
				properties: {
					name: {
						id: id(),
						label: __('Name', 'smartcrawl-seo'),
						type: 'Text',
						source: 'custom_text',
						value: '',
						description: __(
							'The name of the supply.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					image: {
						id: id(),
						label: __('Image', 'smartcrawl-seo'),
						type: 'ImageObject',
						source: 'image',
						value: '',
						description: __(
							'An image of the supply.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
				},
			},
		},
		description: __(
			'Supplies consumed when performing instructions or a direction.',
			'smartcrawl-seo'
		),
	},
	tool: {
		id: id(),
		label: __('Tools', 'smartcrawl-seo'),
		labelSingle: __('Tool', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Tool', 'smartcrawl-seo'),
				type: 'HowToTool',
				properties: {
					name: {
						id: id(),
						label: __('Name', 'smartcrawl-seo'),
						type: 'Text',
						source: 'custom_text',
						value: '',
						description: __(
							'The name of the tool.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					image: {
						id: id(),
						label: __('Image', 'smartcrawl-seo'),
						type: 'ImageObject',
						source: 'image',
						value: '',
						description: __(
							'An image of the tool.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
				},
			},
		},
		description: __(
			'Objects used (but not consumed) when performing instructions or a direction.',
			'smartcrawl-seo'
		),
	},
	estimatedCost: {
		id: id(),
		label: __('Estimated Cost', 'smartcrawl-seo'),
		type: 'MonetaryAmount',
		disallowAddition: true,
		properties: HowToMonetaryAmount,
		description: __(
			'The estimated cost of the supplies consumed when performing instructions.',
			'smartcrawl-seo'
		),
	},
	step: {
		id: id(),
		label: __('Steps', 'smartcrawl-seo'),
		labelSingle: __('Step', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Step', 'smartcrawl-seo'),
				type: 'HowToStep',
				disallowDeletion: true,
				disallowFirstItemDeletionOnly: true,
				properties: {
					name: {
						id: id(),
						label: __('Name', 'smartcrawl-seo'),
						type: 'Text',
						source: 'custom_text',
						value: '',
						description: __(
							'The word or short phrase summarizing the step (for example, "Attach wires to post" or "Dig").',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					text: {
						id: id(),
						label: __('Text', 'smartcrawl-seo'),
						type: 'Text',
						source: 'custom_text',
						value: '',
						required: true,
						description: __(
							'The full instruction text of this step.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					image: {
						id: id(),
						label: __('Image', 'smartcrawl-seo'),
						type: 'ImageObject',
						source: 'image',
						value: '',
						description: __(
							'An image for the step.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
					url: {
						id: id(),
						label: __('Url', 'smartcrawl-seo'),
						type: 'Text',
						source: 'custom_text',
						value: '',
						description: __(
							'A URL that directly links to the step (if one is available). For example, an anchor link fragment.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
				},
			},
		},
		required: true,
		description: __(
			"An array of elements which comprise the full instructions of the how-to. Each step element should correspond to an individual step in the instructions. Don't mark up non-step data such as a summary or introduction section, using this property.",
			'smartcrawl-seo'
		),
	},
	comment: {
		id: id(),
		label: __('Comments', 'smartcrawl-seo'),
		type: 'Comment',
		loop: 'post-comments',
		loopDescription: __(
			'The following block will be repeated for each post comment'
		),
		properties: HowToComment,
		optional: true,
		description: __('Comments, typically from users.', 'smartcrawl-seo'),
	},
	aggregateRating: {
		id: id(),
		label: __('Aggregate Rating', 'smartcrawl-seo'),
		type: 'AggregateRating',
		properties: AggregateRating,
		description: __(
			'A nested aggregateRating of the how-to.',
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
		description: __('Reviews of the how-to.', 'smartcrawl-seo'),
		optional: true,
	},
};
export default HowTo;
