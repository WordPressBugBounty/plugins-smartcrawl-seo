import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import ArticleComment from './article-comment';
import ArticlePublisher from './article-publisher';
import ArticleAuthor from './article-author';

const id = uniqueId;
const Article = {
	headline: {
		id: id(),
		label: __('Headline', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_title',
		required: true,
		description: __(
			'The headline of the article. Headlines should not exceed 110 characters.',
			'smartcrawl-seo'
		),
	},
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		description: __('The name of the article.', 'smartcrawl-seo'),
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'seo_meta',
		value: 'seo_description',
		description: __('The description of the article.', 'smartcrawl-seo'),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'post_data',
		value: 'post_permalink',
		description: __('The permanent URL of the article.', 'smartcrawl-seo'),
	},
	thumbnailUrl: {
		id: id(),
		label: __('Thumbnail URL', 'smartcrawl-seo'),
		type: 'ImageURL',
		source: 'post_data',
		value: 'post_thumbnail_url',
		description: __('The thumbnail URL of the article.', 'smartcrawl-seo'),
	},
	dateModified: {
		id: id(),
		label: __('Date Modified', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'post_data',
		value: 'post_modified',
		description: __(
			'The date and time the article was most recently modified, in ISO 8601 format.',
			'smartcrawl-seo'
		),
	},
	datePublished: {
		id: id(),
		label: __('Date Published', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'post_data',
		required: true,
		description: __(
			'The date and time the article was first published, in ISO 8601 format.',
			'smartcrawl-seo'
		),
		value: 'post_date',
	},
	articleBody: {
		id: id(),
		label: __('Article Body', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_content',
		optional: true,
		description: __('The content of the article.', 'smartcrawl-seo'),
	},
	alternativeHeadline: {
		id: id(),
		label: __('Alternative Headline', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		optional: true,
		description: __(
			'Alternative headline for the article.',
			'smartcrawl-seo'
		),
	},
	image: {
		id: id(),
		label: __('Images', 'smartcrawl-seo'),
		labelSingle: __('Image', 'smartcrawl-seo'),
		required: true,
		description: __('Images related to the article.', 'smartcrawl-seo'),
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
	author: {
		id: id(),
		label: __('Author', 'smartcrawl-seo'),
		type: 'Person',
		required: true,
		description: __('The author of the article.', 'smartcrawl-seo'),
		properties: ArticleAuthor,
	},
	publisher: {
		id: id(),
		label: __('Publisher', 'smartcrawl-seo'),
		type: 'Organization',
		required: true,
		description: __('The publisher of the article.', 'smartcrawl-seo'),
		properties: ArticlePublisher,
	},
	comment: {
		id: id(),
		label: __('Comments', 'smartcrawl-seo'),
		type: 'Comment',
		loop: 'post-comments',
		loopDescription: __(
			'The following block will be repeated for each post comment'
		),
		properties: ArticleComment,
		optional: true,
		description: __('Comments, typically from users.', 'smartcrawl-seo'),
	},
};
export default Article;
