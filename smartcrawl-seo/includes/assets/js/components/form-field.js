import React from 'react';
import classnames from 'classnames';

export default class FormField extends React.Component {
	static defaultProps = {
		id: '',
		label: '',
		description: '',
		errorMessage: '',
		isValid: true,
		isRequired: false,
		formControl: false,
		prefix: '',
		suffix: '',
		controlGroupClassName: '',
	};

	render() {
		const { id, label, isRequired, errorMessage, description, isValid } =
			this.props;

		const labelProps = {};

		if (id) {
			labelProps.htmlFor = id;
		}

		return (
			<div
				className={classnames('sui-form-field', {
					'sui-form-field-error': !isValid,
				})}
			>
				<label className="sui-label" {...labelProps}>
					{label}{' '}
					{isRequired && (
						<span className="wds-required-asterisk">*</span>
					)}
				</label>

				{this.renderFormControl()}

				{!isValid && !!errorMessage && (
					<span className="sui-error-message" role="alert">
						{errorMessage}
					</span>
				)}

				{!!description && (
					<p className="sui-description">
						<small>{description}</small>
					</p>
				)}
			</div>
		);
	}

	renderFormControl() {
		const {
			prefix,
			suffix,
			loading,
			disabled,
			controlGroupClassName,
			...propsForControl
		} = this.props;

		const FormControl = this.props.formControl;

		if (suffix || prefix) {
			return (
				<div
					className={classnames(
						'sui-form-control-group',
						controlGroupClassName,
						{
							'sui-disabled': loading || disabled,
						}
					)}
				>
					{!!prefix && (
						<div className="sui-field-prefix">{prefix}</div>
					)}
					<FormControl {...propsForControl} />
					{!!suffix && (
						<div className="sui-field-suffix">{suffix}</div>
					)}
				</div>
			);
		}

		return <FormControl {...propsForControl} />;
	}
}
