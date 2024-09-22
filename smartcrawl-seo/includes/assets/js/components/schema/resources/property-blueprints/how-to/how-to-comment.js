import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';

const id = uniqueId;
const HowToComment = {
	text: {
		id: id(),
		label: __('Text', 'smartcrawl-seo'),
		type: 'Text',
		source: 'comment',
		value: 'comment_text',
		customSources: {
			comment: {
				label: __('Comment', 'smartcrawl-seo'),
				values: {
					comment_text: __('Comment Content', 'smartcrawl-seo'),
				},
			},
		},
		description: __('The body of the comment.', 'smartcrawl-seo'),
	},
	dateCreated: {
		id: id(),
		label: __('Date Created', 'smartcrawl-seo'),
		type: 'Text',
		source: 'comment',
		value: 'comment_date',
		customSources: {
			comment: {
				label: __('Comment', 'smartcrawl-seo'),
				values: {
					comment_date: __('Comment Date', 'smartcrawl-seo'),
				},
			},
		},
		description: __(
			'The date when this comment was created in ISO 8601 format.',
			'smartcrawl-seo'
		),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'Text',
		source: 'comment',
		value: 'comment_url',
		customSources: {
			comment: {
				label: __('Comment', 'smartcrawl-seo'),
				values: {
					comment_url: __('Comment URL', 'smartcrawl-seo'),
				},
			},
		},
		description: __('The permanent URL of the comment.', 'smartcrawl-seo'),
	},
	author: {
		id: id(),
		label: __('Author Name', 'smartcrawl-seo'),
		type: 'Person',
		flatten: true,
		properties: {
			name: {
				id: id(),
				label: __('Author Name', 'smartcrawl-seo'),
				type: 'Text',
				source: 'comment',
				value: 'comment_author_name',
				customSources: {
					comment: {
						label: __('Comment', 'smartcrawl-seo'),
						values: {
							comment_author_name: __(
								'Comment Author Name',
								'smartcrawl-seo'
							),
						},
					},
				},
				description: __(
					'The name of the comment author.',
					'smartcrawl-seo'
				),
			},
		},
	},
};
export default HowToComment;
