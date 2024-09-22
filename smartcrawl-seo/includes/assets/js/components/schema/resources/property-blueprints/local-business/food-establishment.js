import { __ } from '@wordpress/i18n';
import LocalBusiness from './local-business';
import { merge } from 'lodash-es';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const FoodEstablishment = merge(
	{},
	{
		acceptsReservations: {
			id: id(),
			label: __('Accepts Reservations', 'smartcrawl-seo'),
			type: 'Text',
			source: 'options',
			value: 'True',
			customSources: {
				options: {
					label: __('Boolean Value', 'smartcrawl-seo'),
					values: {
						True: __('True', 'smartcrawl-seo'),
						False: __('False', 'smartcrawl-seo'),
					},
				},
			},
		},
		menu: {
			id: id(),
			label: __('Menu URL', 'smartcrawl-seo'),
			type: 'URL',
			source: 'custom_text',
			value: '',
		},
		servesCuisine: {
			id: id(),
			label: __('Serves Cuisine', 'smartcrawl-seo'),
			type: 'Text',
			source: 'custom_text',
			value: '',
		},
	},
	LocalBusiness
);

export default FoodEstablishment;
