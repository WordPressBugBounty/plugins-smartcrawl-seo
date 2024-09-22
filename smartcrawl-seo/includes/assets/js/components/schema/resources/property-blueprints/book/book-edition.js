import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import BookPerson from './book-person';

const id = uniqueId;
const BookEdition = {
	'@id': {
		id: id(),
		label: __('@id', 'smartcrawl-seo'),
		type: 'URL',
		source: 'custom_text',
		value: '',
		required: true,
		disallowDeletion: true,
		description: __(
			"A globally unique ID for the edition in URL format. It must be unique to your organization. The ID must be stable and not change over time. URL format is suggested though not required. It doesn't have to be a working link. The domain used for the @id value must be owned by your organization.",
			'smartcrawl-seo'
		),
	},
	bookFormat: {
		id: id(),
		label: __('Book Format', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'Paperback',
		disallowDeletion: true,
		description: __('The format of the edition.', 'smartcrawl-seo'),
		required: true,
		customSources: {
			options: {
				label: __('Book Formats', 'smartcrawl-seo'),
				values: {
					Paperback: __('Paperback', 'smartcrawl-seo'),
					Hardcover: __('Hardcover', 'smartcrawl-seo'),
					EBook: __('EBook', 'smartcrawl-seo'),
					AudiobookFormat: __('Audiobook', 'smartcrawl-seo'),
				},
			},
		},
	},
	inLanguage: {
		id: id(),
		label: __('Language', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		disallowDeletion: true,
		required: true,
		description: __(
			'The main language of the content in the edition. Use one of the two-letter codes from the list of ISO 639-1 alpha-2 codes.',
			'smartcrawl-seo'
		),
		placeholder: __('E.g. en', 'smartcrawl-seo'),
	},
	isbn: {
		id: id(),
		label: __('ISBN', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		disallowDeletion: true,
		required: true,
		description: __(
			"The ISBN-13 of the edition. If you have ISBN-10, convert it into ISBN-13. If there's no ISBN for the ebook or audiobook, use the ISBN of the print book instead. For example, if the ebook edition doesn't have an ISBN, use the ISBN for the associated print edition.",
			'smartcrawl-seo'
		),
	},
	bookEdition: {
		id: id(),
		label: __('Book Edition', 'smartcrawl-seo'),
		type: 'Text',
		source: 'custom_text',
		value: '',
		disallowDeletion: true,
		description: __(
			'The edition information of the book in free text format. For example, 2nd Edition.',
			'smartcrawl-seo'
		),
		placeholder: __('E.g. 2nd Edition', 'smartcrawl-seo'),
	},
	datePublished: {
		id: id(),
		label: __('Date Published', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		disallowDeletion: true,
		description: __(
			'The date of publication of the edition in YYYY-MM-DD or YYYY format. This can be either a specific date or only a specific year.',
			'smartcrawl-seo'
		),
	},
	name: {
		id: id(),
		label: __('Name', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'custom_text',
		value: '',
		disallowDeletion: true,
		description: __(
			'The title of the edition. Only use this when the title of the edition is different from the title of the work.',
			'smartcrawl-seo'
		),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'custom_text',
		value: '',
		disallowDeletion: true,
		description: __(
			'The URL on your website where the edition is introduced or described.',
			'smartcrawl-seo'
		),
	},
	identifier: {
		id: id(),
		label: __('Identifiers', 'smartcrawl-seo'),
		labelSingle: __('Identifier', 'smartcrawl-seo'),
		description: __(
			'The external or other ID that unambiguously identifies this edition.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
		properties: {
			0: {
				id: id(),
				type: 'PropertyValue',
				disallowDeletion: true,
				disallowFirstItemDeletionOnly: true,
				properties: {
					propertyID: {
						id: id(),
						label: __('Type', 'smartcrawl-seo'),
						type: 'Text',
						source: 'options',
						value: '',
						description: __(
							'The identifier type.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
						customSources: {
							options: {
								label: __('Identifier Types', 'smartcrawl-seo'),
								values: {
									'': __('None', 'smartcrawl-seo'),
									OCLC_NUMBER: __(
										'OCLC_NUMBER',
										'smartcrawl-seo'
									),
									LCCN: __('LCCN', 'smartcrawl-seo'),
									'JP_E-CODE': __(
										'JP_E-CODE',
										'smartcrawl-seo'
									),
								},
							},
						},
					},
					value: {
						id: id(),
						label: __('Value', 'smartcrawl-seo'),
						type: 'Text',
						source: 'custom_text',
						value: '',
						description: __(
							'The identifier value. The external ID that unambiguously identifies this edition. Remove all non-numeric prefixes of the external ID.',
							'smartcrawl-seo'
						),
						disallowDeletion: true,
					},
				},
			},
		},
	},
	author: {
		id: id(),
		label: __('Authors', 'smartcrawl-seo'),
		labelSingle: __('Author', 'smartcrawl-seo'),
		description: __(
			'The author(s) of the edition. Only use this when the author of the edition is different from the work author information.',
			'smartcrawl-seo'
		),
		disallowDeletion: true,
		properties: {
			0: {
				id: id(),
				type: 'Person',
				disallowDeletion: true,
				disallowFirstItemDeletionOnly: true,
				properties: BookPerson,
			},
		},
	},
	sameAs: {
		id: id(),
		label: __('Same As', 'smartcrawl-seo'),
		labelSingle: __('URL', 'smartcrawl-seo'),
		description: __(
			"The URL of a reference web page that unambiguously indicates the edition. For example, a Wikipedia page for this specific edition. Don't reuse the sameAs of the Work.",
			'smartcrawl-seo'
		),
		disallowDeletion: true,
		properties: {
			0: {
				id: id(),
				label: __('URL', 'smartcrawl-seo'),
				type: 'URL',
				source: 'custom_text',
				value: '',
				disallowDeletion: true,
				disallowFirstItemDeletionOnly: true,
			},
		},
	},
};
export default BookEdition;
