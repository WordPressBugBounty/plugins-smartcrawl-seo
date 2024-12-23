import React from 'react';
import { __ } from '@wordpress/i18n';
import Toggle from '../../../components/toggle';
import SettingsRow from '../../../components/settings-row';
import TextInputField from '../../../components/form-fields/text-input-field';
import { connect } from 'react-redux';

const optionalSettings = {
	allow_empty_tax: {
		label: __('Allow autolinks to empty taxonomies', 'smartcrawl-seo'),
		description: __(
			'Allows autolinking to taxonomies that have no posts assigned to them.',
			'wds'
		),
	},
	excludeheading: {
		label: __('Prevent linking in heading tags', 'smartcrawl-seo'),
		description: __(
			'Excludes headings from autolinking.',
			'smartcrawl-seo'
		),
	},
	onlysingle: {
		label: __('Process only single posts and pages', 'smartcrawl-seo'),
		description: __(
			'Process only single posts and pages',
			'smartcrawl-seo'
		),
	},
	allowfeed: {
		label: __('Process RSS feeds', 'smartcrawl-seo'),
		description: __(
			'Autolinking will also occur in RSS feeds.',
			'smartcrawl-seo'
		),
	},
	casesens: {
		label: __('Case sensitive matching', 'smartcrawl-seo'),
		description: __(
			'Only autolink the exact string match.',
			'smartcrawl-seo'
		),
	},
	customkey_preventduplicatelink: {
		label: __('Prevent duplicate links', 'smartcrawl-seo'),
		description: __(
			'Only link to a specific URL once per page/post.',
			'smartcrawl-seo'
		),
	},
	target_blank: {
		label: __('Open links in new tab', 'smartcrawl-seo'),
		description: __(
			'Adds the target=“_blank” tag to links to open a new tab when clicked.',
			'smartcrawl-seo'
		),
	},
	rel_nofollow: {
		label: __('Nofollow autolinks', 'smartcrawl-seo'),
		description: __(
			'Adds the nofollow meta tag to autolinks to prevent search engines following those URLs when crawling your website.',
			'smartcrawl-seo'
		),
	},
	exclude_no_index: {
		label: __('Prevent linking on no-index pages', 'smartcrawl-seo'),
		description: __(
			'Prevent autolinking on no-index pages.',
			'smartcrawl-seo'
		),
	},
	exclude_image_captions: {
		label: __('Prevent linking on image captions', 'smartcrawl-seo'),
		description: __(
			'Prevent links from being added to image captions.',
			'smartcrawl-seo'
		),
	},
	disable_content_cache: {
		label: __('Prevent caching for autolinked content', 'smartcrawl-seo'),
		description: __(
			'Some page builder plugins and themes conflict with object cache when automatic linking is enabled. Enable this option to disable object cache for autolinked content.',
			'smartcrawl-seo'
		),
	},
};

class Settings extends React.Component {
	render() {
		const { options, updateOption, loading } = this.props;

		return (
			<>
				<SettingsRow
					label={__('Min lengths', 'smartcrawl-seo')}
					description={__(
						'Define the shortest title and taxonomy length to autolink. Smaller titles will be ignored.',
						'smartcrawl-seo'
					)}
				>
					<div className="sui-row sui-no-margin-bottom">
						<div className="sui-col-auto">
							<TextInputField
								type="number"
								label={__('Posts & pages', 'smartcrawl-seo')}
								className="sui-input-sm"
								value={options.cpt_char_limit}
								onChange={(val) =>
									updateOption('cpt_char_limit', val)
								}
								disabled={loading}
							></TextInputField>
						</div>
						<div className="sui-col-auto">
							<TextInputField
								type="number"
								label={__(
									'Archives & taxonomies',
									'smartcrawl-seo'
								)}
								className="sui-input-sm"
								value={options.tax_char_limit}
								onChange={(val) =>
									updateOption('tax_char_limit', val)
								}
								disabled={loading}
							></TextInputField>
						</div>
					</div>
					<p className="sui-description">
						{__(
							'We recommend a minimum of 10 chars for each type.',
							'smartcrawl-seo'
						)}
					</p>
				</SettingsRow>
				<SettingsRow
					label={__('Max limits', 'smartcrawl-seo')}
					description={__(
						'Set the max amount of links you want to appear per post.',
						'smartcrawl-seo'
					)}
				>
					<div className="sui-row sui-no-margin-bottom">
						<div className="sui-col-auto">
							<TextInputField
								type="number"
								label={__('Per post total', 'smartcrawl-seo')}
								className="sui-input-sm"
								value={options.link_limit}
								onChange={(val) =>
									updateOption('link_limit', val)
								}
								disabled={loading}
							></TextInputField>
						</div>
						<div className="sui-col-auto">
							<TextInputField
								type="number"
								label={__(
									'Per keyword group',
									'smartcrawl-seo'
								)}
								className="sui-input-sm"
								value={options.single_link_limit}
								onChange={(val) =>
									updateOption('single_link_limit', val)
								}
								disabled={loading}
							></TextInputField>
						</div>
					</div>
					<p className="sui-description">
						{__(
							'Use 0 to allow unlimited automatic links.',
							'smartcrawl-seo'
						)}
					</p>
				</SettingsRow>
				<SettingsRow
					label={__('Optional Settings', 'smartcrawl-seo')}
					description={__(
						'Configure extra settings for absolute control over autolinking.',
						'smartcrawl-seo'
					)}
				>
					{Object.keys(optionalSettings).map((key, index) => {
						return (
							<div className="sui-row" key={index}>
								<div className="sui-col-2">
									<Toggle
										value={key}
										label={optionalSettings[key].label}
										description={
											optionalSettings[key].description
										}
										checked={options[key]}
										onChange={(val) =>
											updateOption(key, val)
										}
									/>
								</div>
							</div>
						);
					})}
				</SettingsRow>
			</>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
