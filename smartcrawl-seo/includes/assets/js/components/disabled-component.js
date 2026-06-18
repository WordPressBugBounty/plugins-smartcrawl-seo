import React from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import Notice from './notices/notice';
import Button from './button';
import ConfigValues from '../es6/config-values';

export default class DisabledComponent extends React.Component {
	static defaultProps = {
		imagePath: ConfigValues.get('empty_box_logo', 'admin') || false,
		message: '',
		notice: '',
		inner: false,
		premium: false,
		upgradeTag: '',
		button: null,
	};

	render() {
		const {
			imagePath,
			message,
			notice,
			inner,
			premium,
			upgradeTag,
			button,
		} = this.props;

		return (
			<div
				className={classnames('sui-message', {
					'sui-box': !inner,
				})}
			>
				{!!imagePath && (
					<img
						src={imagePath}
						aria-hidden="true"
						className="wds-disabled-image"
						alt={__('Disabled component', 'smartcrawl-seo')}
					/>
				)}
				<div className="sui-message-content">
					<p>{message}</p>

					{!!notice && <Notice message={notice}></Notice>}

					{premium && (
						<Button
							color="purple"
							target="_blank"
							href={
								'https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=' +
								upgradeTag
							}
							text={__('Upgrade to Pro', 'smartcrawl-seo')}
						></Button>
					)}
					{!premium && button}
				</div>
			</div>
		);
	}
}
