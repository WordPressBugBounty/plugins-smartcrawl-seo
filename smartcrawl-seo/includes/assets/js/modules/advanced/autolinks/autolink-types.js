import React from 'react';
import { __ } from '@wordpress/i18n';
import SettingsRow from '../../../components/settings-row';
import SelectField from '../../../components/form-fields/select-field';
import { connect } from 'react-redux';

class AutolinkTypes extends React.Component {
	render() {
		const {
			options,
			insert_options: insertOpts,
			link_to_options: linkToOpts,
			loading,
			updateOption,
		} = this.props;

		return (
			<SettingsRow
				label={__('Post Types', 'smartcrawl-seo')}
				description={__(
					'Use the options below to select post types to insert links in, and post types/taxonomies to link to.',
					'smartcrawl-seo'
				)}
				direction="column"
			>
				<div className="sui-border-frame">
					<SelectField
						label={__('Insert Links', 'smartcrawl-seo')}
						description={__(
							'Select the post types to insert links in.',
							'smartcrawl-seo'
						)}
						selectedValue={options.insert}
						multiple={true}
						onSelect={(values) => updateOption('insert', values)}
						options={insertOpts}
						disabled={loading}
					/>
					<SelectField
						label={__('Link To', 'smartcrawl-seo')}
						description={__(
							'Select the post types & taxonomies that can be linked to.',
							'smartcrawl-seo'
						)}
						selectedValue={options.link_to}
						multiple={true}
						onSelect={(values) => updateOption('link_to', values)}
						options={linkToOpts}
						disabled={loading}
					/>
				</div>
			</SettingsRow>
		);
	}
}

const mapStateToProps = (state) => ({ ...state.autolinks });

const mapDispatchToProps = {
	updateOption: (key, value) => ({
		type: 'UPDATE_OPTION',
		key,
		value,
	}),
};

export default connect(mapStateToProps, mapDispatchToProps)(AutolinkTypes);
