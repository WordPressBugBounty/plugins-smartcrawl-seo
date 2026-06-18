import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { connect } from 'react-redux';
import UrlUtil from '../../../utils/url-util';
import Notice from '../../../components/notices/notice';
import ConfigValues from '../../../es6/config-values';
import Tabs from '../../../components/tabs';
import SettingsRow from '../../../components/settings-row';
import SubmoduleBox from '../../../components/layout/submodule-box';

class Autolinks extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			subTab: !!UrlUtil.getQueryParam('sub')
				? UrlUtil.getQueryParam('sub')
				: 'post_types',
		};
	}

	handleTabChange(tab) {
		const urlParts = location.href.split('&sub=');

		history.replaceState({}, '', urlParts[0] + '&sub=' + tab);

		event.preventDefault();
		event.stopPropagation();

		this.setState({
			subTab: tab,
		});
	}

	render() {
		return (
			<SubmoduleBox
				id="tab_automatic_linking"
				name="autolinks"
				title={__('Automatic Linking', 'smartcrawl-seo')}
				headerLeft={this.renderTag()}
				activateProps={{
					message: createInterpolateElement(
						sprintf(
							// translators: %s: plugin title
							__(
								'Configure <strong>%s</strong> to automatically link certain keywords to a page on your blog or even a whole new site all together. Internal linking can help boost SEO by giving search engines ample ways to index your site.',
								'wds'
							),
							ConfigValues.get('plugin_title', 'admin')
						),
						{ strong: <strong /> }
					),
					premium: true,
					upgradeTag: 'smartcrawl_autolinking_upgrade_button',
				}}
				deactivateProps={{
					description: __(
						'No longer need keyword linking? This will deactivate your ' +
							'feature but retain your Autolink Settings.',
						'wds'
					),
				}}
			>
				<p>
					{createInterpolateElement(
						sprintf(
							// translators: %s: plugin title
							__(
								'<strong>%s</strong> will look for keywords that match posts/pages around your website and automatically link them. Specify what post types you want to include in this tool, and what post types you want those to automatically link to.',
								'wds'
							),
							ConfigValues.get('plugin_title', 'admin')
						),
						{ strong: <strong /> }
					)}
				</p>
				</SubmoduleBox>
		);
	}
	renderTag() {
		return (
			<a
				target="_blank"
				href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_autolinking_pro_tag"
				rel="noreferrer"
			>
				<span
					className="sui-tag sui-tag-pro sui-tooltip"
					data-tooltip={__(
						'Upgrade to SmartCrawl Pro',
						'smartcrawl-seo'
					)}
				>
					{__('Pro', 'smartcrawl-seo')}
				</span>
			</a>
		);
	}
}

const mapStateToProps = (state) => ({ ...state.autolinks });

export default connect(mapStateToProps)(Autolinks);
