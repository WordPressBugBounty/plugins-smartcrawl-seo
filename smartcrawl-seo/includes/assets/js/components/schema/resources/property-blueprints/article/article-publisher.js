import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import ArticlePostalAddress from './article-postal-address';
import ArticleContactPoint from './article-contact-point';

const id = uniqueId;
const ArticlePublisher = {
	logo: {
		id: id(),
		label: __('Logo', 'smartcrawl-seo'),
		type: 'ImageObject',
		source: 'schema_settings',
		value: 'organization_logo',
		description: __('The logo of the publisher.', 'smartcrawl-seo'),
		required: true,
	},
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'schema_settings',
		value: 'organization_name',
		description: __('The name of the publisher.', 'smartcrawl-seo'),
		required: true,
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'site_settings',
		value: 'site_url',
		description: __('The URL of the publisher.', 'smartcrawl-seo'),
	},
	address: {
		id: id(),
		label: __('Addresses', 'smartcrawl-seo'),
		labelSingle: __('Address', 'smartcrawl-seo'),
		optional: true,
		description: __('The addresses of the publisher.', 'smartcrawl-seo'),
		properties: {
			0: {
				id: id(),
				type: 'PostalAddress',
				properties: ArticlePostalAddress,
			},
		},
	},
	contactPoint: {
		id: id(),
		label: __('Contact Points', 'smartcrawl-seo'),
		labelSingle: __('Contact Point', 'smartcrawl-seo'),
		optional: true,
		description: __(
			'The contact points of the publisher.',
			'smartcrawl-seo'
		),
		properties: {
			0: {
				id: id(),
				type: 'ContactPoint',
				properties: ArticleContactPoint,
			},
		},
	},
};
export default ArticlePublisher;
