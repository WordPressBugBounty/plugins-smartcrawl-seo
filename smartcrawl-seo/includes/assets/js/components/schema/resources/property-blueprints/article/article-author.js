import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const ArticleAuthor = {
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'author',
		value: 'author_full_name',
		required: true,
		description: __('The name of the article author.', 'smartcrawl-seo'),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'author',
		value: 'author_url',
		description: __('The URL of the article author.', 'smartcrawl-seo'),
	},
	image: {
		id: id(),
		label: __('Image', 'smartcrawl-seo'),
		type: 'ImageObject',
		source: 'author',
		value: 'author_gravatar',
		description: __(
			'The profile image of the article author.',
			'smartcrawl-seo'
		),
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'author',
		value: 'author_description',
		optional: true,
		description: __(
			'The description of the article author.',
			'smartcrawl-seo'
		),
	},
};
export default ArticleAuthor;
