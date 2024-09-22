import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import MoviePerson from './movie-person';
import AggregateRating from '../aggregate-rating';
import Review from '../review/review';
import MovieProductionCompany from './movie-production-company';
import MovieActor from './movie-actor';

const id = uniqueId;
const Movie = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		description: __('The name of the movie.', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		required: true,
	},
	dateCreated: {
		id: id(),
		label: __('Release Date', 'smartcrawl-seo'),
		description: __('The date the movie was released.', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
	},
	image: {
		id: id(),
		label: __('Images', 'smartcrawl-seo'),
		labelSingle: __('Image', 'smartcrawl-seo'),
		description: __(
			"An image that represents the movie. Images must have a high resolution and have a 6:9 aspect ratio. While Google can crop images that are close to a 6:9 aspect ratio, images largely deviating from this ratio aren't eligible for the feature.",
			'smartcrawl-seo'
		),
		required: true,
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
	director: {
		id: id(),
		label: __('Director', 'smartcrawl-seo'),
		description: __('The director of the movie.', 'smartcrawl-seo'),
		type: 'Person',
		properties: MoviePerson,
	},
	aggregateRating: {
		id: id(),
		label: __('Aggregate Rating', 'smartcrawl-seo'),
		type: 'AggregateRating',
		properties: AggregateRating,
		description: __(
			'A nested aggregateRating of the movie.',
			'smartcrawl-seo'
		),
		optional: true,
	},
	review: {
		id: id(),
		label: __('Reviews', 'smartcrawl-seo'),
		labelSingle: __('Review', 'smartcrawl-seo'),
		description: __('Reviews of the movie.', 'smartcrawl-seo'),
		optional: true,
		properties: {
			0: {
				id: id(),
				type: 'Review',
				properties: Review,
			},
		},
	},
	actor: {
		id: id(),
		label: __('Actors', 'smartcrawl-seo'),
		labelSingle: __('Actor', 'smartcrawl-seo'),
		description: __('Actors working in the movie', 'smartcrawl-seo'),
		optional: true,
		properties: {
			0: {
				id: id(),
				type: 'Person',
				properties: MovieActor,
			},
		},
	},
	countryOfOrigin: {
		id: id(),
		label: __('Country Of Origin', 'smartcrawl-seo'),
		type: 'Country',
		flatten: true,
		optional: true,
		properties: {
			name: {
				id: id(),
				label: __('Country Of Origin', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				description: __(
					'The country of the principal offices of the production company or individual responsible for the movie.',
					'smartcrawl-seo'
				),
				placeholder: __('E.g. USA', 'smartcrawl-seo'),
			},
		},
	},
	duration: {
		id: id(),
		label: __('Duration', 'smartcrawl-seo'),
		description: __(
			'The duration of the item in ISO 8601 date format.',
			'smartcrawl-seo'
		),
		type: 'Duration',
		source: 'duration',
		value: '',
		optional: true,
		placeholder: __('E.g. PT00H30M5S', 'smartcrawl-seo'),
	},
	musicBy: {
		id: id(),
		label: __('Music By', 'smartcrawl-seo'),
		description: __('The composer of the soundtrack.', 'smartcrawl-seo'),
		type: 'Person',
		optional: true,
		properties: MoviePerson,
	},
	productionCompany: {
		id: id(),
		label: __('Production Company', 'smartcrawl-seo'),
		type: 'Organization',
		optional: true,
		description: __(
			'The production company or studio responsible for the movie.',
			'smartcrawl-seo'
		),
		properties: MovieProductionCompany,
	},
};
export default Movie;
