import React from 'react';
import { __ } from '@wordpress/i18n';
import SettingsRow from '../../../components/settings-row';
import ConfigValues from '../../../es6/config-values';
import Toggle from '../../../components/toggle';

export default class AutoLinking extends React.Component {
	render() {
		const { autolinks } = ConfigValues.get('advanced', 'metabox');

		if (!autolinks) {
			return '';
		}

		return (
			<SettingsRow
				label={__('Automatic Linking', 'smartcrawl-seo')}
				description={__(
					'You can prevent this particular post from being auto-linked.',
					'smartcrawl-seo'
				)}
			>
				<Toggle
					name="wds_autolinks-exclude"
					label={__(
						'Enable automatic linking for this post',
						'smartcrawl-seo'
					)}
					description={__(
						'Enter the URL to send traffic to including http:// or https://',
						'smartcrawl-seo'
					)}
					checked={autolinks.exclude}
					inverted={true}
				></Toggle>
			</SettingsRow>
		);
	}
}
