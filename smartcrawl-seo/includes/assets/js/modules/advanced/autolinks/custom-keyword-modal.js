import React from 'react';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import Button from '../../../components/button';
import Modal from '../../../components/modal';
import fieldWithValidation from '../../../components/field-with-validation';
import TextInputField from '../../../components/form-fields/text-input-field';
import {
	isAbsoluteUrlValid,
	isRelativeUrlValid,
	isValuePlainText,
	Validator,
} from '../../../utils/validators';

class WrappedKeywordField extends React.Component {
	render() {
		return (
			<TextInputField
				beforeChange={(value) => value.replace(/^\s+/g, '')}
				{...this.props}
			/>
		);
	}
}

const KeywordField = fieldWithValidation(WrappedKeywordField, [
	isValuePlainText,
]);
const UrlField = fieldWithValidation(TextInputField, [
	new Validator(
		(value) => !value.match(/\s/g),
		__('You cannot use whitespace for URL', 'smartcrawl-seo')
	),
	new Validator(
		(value) =>
			value === '' ||
			isRelativeUrlValid(value) ||
			isAbsoluteUrlValid(value),
		__(
			'Please use an absolute URL like https://domain.com/new-url or start with a slash /new-url.',
			'smartcrawl-seo'
		)
	),
]);

export default class CustomKeywordModal extends React.Component {
	static defaultProps = {
		keyword: '',
		url: '',
		editMode: false,
		onClose: () => false,
		onSave: () => false,
	};

	constructor(props) {
		super(props);

		// Assume that values being edited are valid, whereas new empty values are invalid
		const initiallyValid = this.props.editMode;

		this.state = {
			keyword: this.props.keyword,
			keywordIsValid: initiallyValid,
			url: this.props.url,
			urlIsValid: initiallyValid,
		};
	}

	handleKeywordChange(keyword, isValid) {
		this.setState({
			keyword,
			keywordIsValid: isValid,
		});
	}

	handleUrlChange(url, isValid) {
		this.setState({
			url,
			urlIsValid: isValid,
		});
	}

	render() {
		const { keyword, url, keywordIsValid, urlIsValid } = this.state;
		const onSubmit = () => this.props.onSave(keyword, url);
		const submissionDisabled =
			!keyword || !url || !keywordIsValid || !urlIsValid;

		return (
			<Modal
				id="wds-custom-keywords"
				title={__('Add Custom Keywords', 'smartcrawl-seo')}
				description={__(
					'Choose your keywords, and then specify the URL to auto-link to.',
					'smartcrawl-seo'
				)}
				enterDisabled={submissionDisabled}
				focusAfterOpen="wds-custom-keyword"
				focusAfterClose="wds-keyword-pair-new-button"
				onEnter={onSubmit}
				onClose={this.props.onClose}
				footer={
					<React.Fragment>
						<div className="sui-flex-child-right">
							<Button
								text={__('Cancel', 'smartcrawl-seo')}
								ghost={true}
								onClick={this.props.onClose}
							/>
						</div>

						<div className="sui-actions-right">
							<Button
								text={__('Save', 'smartcrawl-seo')}
								color="blue"
								onClick={onSubmit}
								icon="sui-icon-save"
								disabled={submissionDisabled}
							/>
						</div>
					</React.Fragment>
				}
			>
				<KeywordField
					id="wds-custom-keyword"
					label={createInterpolateElement(
						__(
							'Keyword group <span>Usually related terms</span>',
							'smartcrawl-seo'
						),
						{
							span: <span />,
						}
					)}
					value={keyword}
					placeholder={__(
						'E.g. Cats, Kittens, Felines',
						'smartcrawl-seo'
					)}
					onChange={(kw, isValid) =>
						this.handleKeywordChange(kw, isValid)
					}
				/>

				<UrlField
					id="wds-custom-link-url"
					label={createInterpolateElement(
						__(
							'Link URL <span>Both internal and external links are supported</span>',
							'smartcrawl-seo'
						),
						{
							span: <span />,
						}
					)}
					value={url}
					placeholder={__('E.g. /cats', 'smartcrawl-seo')}
					description={createInterpolateElement(
						__(
							'Formats include relative (E.g. <strong>/cats</strong>) or absolute URLs (E.g. <strong>https://www.website.com/cats</strong> or <strong>https://website.com/cats</strong>).',
							'smartcrawl-seo'
						),
						{
							strong: <strong />,
						}
					)}
					onChange={(_url, isValid) =>
						this.handleUrlChange(_url, isValid)
					}
				/>
			</Modal>
		);
	}
}
