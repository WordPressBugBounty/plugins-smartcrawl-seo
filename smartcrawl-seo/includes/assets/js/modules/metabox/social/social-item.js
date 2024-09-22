import React from 'react';
import { __ } from '@wordpress/i18n';
import SettingsRow from '../../../components/settings-row';
import Toggle from '../../../components/toggle';
import TextInputField from '../../../components/form-fields/text-input-field';
import ImageUploadsField from '../../../components/form-fields/image-uploads-field';

export default class SocialItem extends React.Component {
	static defaultProps = {
		type: 'opengraph',
		label: '',
		description: '',
		titlePlaceholder: '',
		titleValue: '',
		descPlaceholder: '',
		descValue: '',
		disabled: false,
		images: [],
		isSingle: false,
	};

	render() {
		const {
			type,
			label,
			description,
			titlePlaceholder,
			titleValue,
			descPlaceholder,
			descValue,
			disabled,
			images,
			isSingle,
		} = this.props;

		return (
			<SettingsRow label={label} description={description}>
				<Toggle
					id={`wds-${type}-disabled`}
					name={`wds-${type}[disabled]`}
					label={__('Enable for this post', 'smartcrawl-seo')}
					checked={disabled}
					inverted={true}
				>
					<TextInputField
						id={`wds-${type}-title`}
						name={`wds-${type}[title]`}
						label={__('Title', 'smartcrawl-seo')}
						placeholder={titlePlaceholder}
						value={titleValue}
					></TextInputField>
					<TextInputField
						id={`wds-${type}-description`}
						name={`wds-${type}[description]`}
						label={__('Description', 'smartcrawl-seo')}
						placeholder={descPlaceholder}
						value={descValue}
					></TextInputField>
					<ImageUploadsField
						id={`wds-${type}-images`}
						label={
							isSingle
								? __('Featured Image', 'smartcrawl-seo')
								: __('Featured Images', 'smartcrawl-seo')
						}
						name={`wds-${type}`}
						isSingle={isSingle}
						images={images}
					></ImageUploadsField>
				</Toggle>
			</SettingsRow>
		);
	}
}
