import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import RecipeAuthorPerson from './recipe-author-person';
import RecipeAuthorOrganization from './recipe-author-organization';
import RecipeInstructionsHowToStep from './recipe-instructions-how-to-step';
import RecipeVideo from './recipe-video';
import AggregateRating from '../aggregate-rating';
import Review from '../review/review';

const id = uniqueId;
const Recipe = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		description: __('The name of the dish.', 'smartcrawl-seo'),
		required: true,
	},
	datePublished: {
		id: id(),
		label: __('Date Published', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'post_data',
		description: __(
			'The date and time the recipe was first published, in ISO 8601 format.',
			'smartcrawl-seo'
		),
		value: 'post_date',
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_description',
		description: __(
			'A short summary describing the dish.',
			'smartcrawl-seo'
		),
	},
	recipeCategory: {
		id: id(),
		label: __('Recipe Category', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. dessert', 'smartcrawl-seo'),
		description: __(
			'The type of meal or course your recipe is about. For example: "dinner", "main course", or "dessert, snack".',
			'smartcrawl-seo'
		),
	},
	recipeCuisine: {
		id: id(),
		label: __('Recipe Cuisine', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. Mediterranean', 'smartcrawl-seo'),
		description: __(
			'The region associated with your recipe. For example, "French", Mediterranean", or "American".',
			'smartcrawl-seo'
		),
	},
	keywords: {
		id: id(),
		label: __('Keywords', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		placeholder: __('E.g. authentic', 'smartcrawl-seo'),
		description: __(
			'Other terms for your recipe such as the season ("summer"), the holiday ("Halloween"), or other descriptors ("quick", "easy", "authentic"). Don\'t use a tag that should be in recipeCategory or recipeCuisine.',
			'smartcrawl-seo'
		),
	},
	prepTime: {
		id: id(),
		label: __('Prep Time', 'smartcrawl-seo'),
		type: 'Duration',
		source: 'duration',
		value: '',
		description: __(
			'The length of time it takes to prepare the dish in ISO 8601 duration format. Always use in combination with cookTime.',
			'smartcrawl-seo'
		),
		placeholder: __('E.g. PT1M', 'smartcrawl-seo'),
	},
	cookTime: {
		id: id(),
		label: __('Cook Time', 'smartcrawl-seo'),
		type: 'Duration',
		source: 'duration',
		value: '',
		description: __(
			'The time it takes to actually cook the dish in ISO 8601 duration format. Always use in combination with prepTime.',
			'smartcrawl-seo'
		),
		placeholder: __('E.g. PT2M', 'smartcrawl-seo'),
	},
	totalTime: {
		id: id(),
		label: __('Total Time', 'smartcrawl-seo'),
		type: 'Duration',
		source: 'duration',
		value: '',
		description: __(
			'The total time it takes to prepare and cook the dish in ISO 8601 duration format. Use totalTime or a combination of both cookTime and prepTime.',
			'smartcrawl-seo'
		),
		placeholder: __('E.g. PT3M', 'smartcrawl-seo'),
	},
	nutrition: {
		id: id(),
		label: __('Nutrition', 'smartcrawl-seo'),
		type: 'NutritionInformation',
		flatten: true,
		properties: {
			calories: {
				id: id(),
				label: __('Calories Per Serving', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				description: __(
					'The number of calories in each serving produced with this recipe. If calories is defined, recipeYield must be defined with the number of servings.',
					'smartcrawl-seo'
				),
				placeholder: __('E.g. 270 calories'),
			},
		},
	},
	recipeYield: {
		id: id(),
		label: __('Recipe Yield', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		placeholder: __('E.g. 6', 'smartcrawl-seo'),
		description: __(
			'Specify the number of servings produced from this recipe with a number. This is required if you specify calories per serving.',
			'smartcrawl-seo'
		),
	},
	image: {
		id: id(),
		label: __('Images', 'smartcrawl-seo'),
		labelSingle: __('Image', 'smartcrawl-seo'),
		required: true,
		description: __(
			'Images of the completed dish. For best results, provide multiple high-resolution images (minimum of 50K pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1.',
			'smartcrawl-seo'
		),
		properties: {
			0: {
				id: id(),
				label: __('Image', 'smartcrawl-seo'),
				type: 'ImageObject',
				source: 'post_data',
				value: 'post_thumbnail',
			},
		},
	},
	recipeIngredient: {
		id: id(),
		label: __('Ingredients', 'smartcrawl-seo'),
		labelSingle: __('Ingredient', 'smartcrawl-seo'),
		description: __('Ingredients used in the recipe.', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				label: __('Ingredient', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				placeholder: __('E.g. 3/4 cup sugar', 'smartcrawl-seo'),
			},
		},
	},
	recipeInstructions: {
		id: id(),
		label: __('Instructions', 'smartcrawl-seo'),
		activeVersion: 'InstructionStepsText',
		properties: {
			InstructionStepsText: {
				id: id(),
				label: __('Instructions', 'smartcrawl-seo'),
				labelSingle: __('Instruction', 'smartcrawl-seo'),
				description: __(
					'The steps to make the dish.',
					'smartcrawl-seo'
				),
				properties: {
					0: {
						id: id(),
						label: __('Step', 'smartcrawl-seo') + ' 1',
						type: 'Text',
						source: 'custom_text',
						value: '',
						updateLabelNumber: true,
					},
				},
				isAnAltVersion: true,
			},
			InstructionStepsHowTo: {
				id: id(),
				label: __('Instruction HowTo Steps', 'smartcrawl-seo'),
				labelSingle: __('Instruction Step', 'smartcrawl-seo'),
				description: __(
					'An array of elements which comprise the full instructions of the recipe. Each step element should correspond to an individual step in the recipe.',
					'smartcrawl-seo'
				),
				properties: {
					0: {
						id: id(),
						label: __('Instruction Step', 'smartcrawl-seo'),
						type: 'HowToStep',
						properties: RecipeInstructionsHowToStep,
					},
				},
				isAnAltVersion: true,
			},
		},
	},
	author: {
		id: id(),
		label: __('Author', 'smartcrawl-seo'),
		activeVersion: 'Person',
		properties: {
			Person: {
				id: id(),
				label: __('Author', 'smartcrawl-seo'),
				type: 'Person',
				properties: RecipeAuthorPerson,
				description: __(
					"The author of the recipe. The author's name must be a valid name.",
					'smartcrawl-seo'
				),
				isAnAltVersion: true,
			},
			Organization: {
				id: id(),
				label: __('Author Organization', 'smartcrawl-seo'),
				type: 'Organization',
				properties: RecipeAuthorOrganization,
				description: __(
					"The author of the recipe. The author's name must be a valid name.",
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
			'A nested aggregateRating of the recipe.',
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
		description: __('Reviews of the recipe.', 'smartcrawl-seo'),
		optional: true,
	},
	video: {
		id: id(),
		label: __('Video', 'smartcrawl-seo'),
		description: __(
			'A video depicting the steps to make the dish.',
			'smartcrawl-seo'
		),
		type: 'VideoObject',
		properties: RecipeVideo,
		optional: true,
	},
};
export default Recipe;
