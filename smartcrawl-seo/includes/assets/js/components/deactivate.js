import React from 'react';
import { __ } from '@wordpress/i18n';
import SettingsRow from './settings-row';
import Button from './button';

export default class Deactivate extends React.Component {
	static defaultProps = {
		name: '',
		description: '',
	};

	render() {
		const { description, name } = this.props;

		return (
			<SettingsRow
				label={__('Deactivate', 'smartcrawl-seo')}
				description={description}
			>
				<Button
					type="submit"
					name={name}
					color="ghost"
					icon="sui-icon-power-on-off"
					text={__('Deactivate', 'smartcrawl-seo')}
					value="0"
				></Button>
			</SettingsRow>
		);
	}
}
