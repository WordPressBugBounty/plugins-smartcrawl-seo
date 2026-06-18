import React from 'react';
import { __ } from '@wordpress/i18n';
import ConfigValues from '../../es6/config-values';

export default class Footer extends React.Component {
	render() {
		const defaultFooterText = ConfigValues.get(
			'default_footer_text',
			'admin'
		);

		return (
			<>
				<div
					className="sui-footer"
					dangerouslySetInnerHTML={{
						__html: defaultFooterText,
					}}
				/>
				<ul className="sui-footer-nav">
					<li>
						<a
							href="https://profiles.wordpress.org/wpmudev#content-plugins"
							target="_blank"
							rel="noreferrer"
						>
							{__('Free Plugins', 'smartcrawl-seo')}
						</a>
					</li>
					<li>
						<a
							href="https://wpmudev.com/features/"
							target="_blank"
							rel="noreferrer"
						>
							{__('Membership', 'smartcrawl-seo')}
						</a>
					</li>
					<li>
						<a
							href="https://wpmudev.com/roadmap/"
							target="_blank"
							rel="noreferrer"
						>
							{__('Roadmap', 'smartcrawl-seo')}
						</a>
					</li>
					<li>
						<a
							href="https://wordpress.org/support/plugin/smartcrawl-seo"
							target="_blank"
							rel="noreferrer"
						>
							{__('Support', 'smartcrawl-seo')}
						</a>
					</li>
					<li>
						<a
							href="https://wpmudev.com/docs/"
							target="_blank"
							rel="noreferrer"
						>
							{__('Docs', 'smartcrawl-seo')}
						</a>
					</li>
					<li>
						<a
							href="https://wpmudev.com/hub-welcome/"
							target="_blank"
							rel="noreferrer"
						>
							{__('The Hub', 'smartcrawl-seo')}
						</a>
					</li>
					<li>
						<a
							href="https://wpmudev.com/terms-of-service/"
							target="_blank"
							rel="noreferrer"
						>
							{__('Terms of Service', 'smartcrawl-seo')}
						</a>
					</li>
					<li>
						<a
							href="https://incsub.com/privacy-policy/"
							target="_blank"
							rel="noreferrer"
						>
							{__('Privacy Policy', 'smartcrawl-seo')}
						</a>
					</li>
				</ul>

				<ul className="sui-footer-social">
					<li>
						<a
							href="https://www.facebook.com/wpmudev"
							target="_blank"
							rel="noreferrer"
						>
							<span
								className="sui-icon-social-facebook"
								aria-hidden="true"
							></span>
							<span className="sui-screen-reader-text">
								{__('Facebook', 'smartcrawl-seo')}
							</span>
						</a>
					</li>
					<li>
						<a
							href="https://twitter.com/wpmudev"
							target="_blank"
							rel="noreferrer"
						>
							<span
								className="sui-icon-social-twitter"
								aria-hidden="true"
							></span>
							<span className="sui-screen-reader-text">
								{__('X', 'smartcrawl-seo')}
							</span>
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/wpmu_dev/"
							target="_blank"
							rel="noreferrer"
						>
							<span
								className="sui-icon-instagram"
								aria-hidden="true"
							></span>
							<span className="sui-screen-reader-text">
								{__('Instagram', 'smartcrawl-seo')}
							</span>
						</a>
					</li>
				</ul>
			</>
		);
	}
}
