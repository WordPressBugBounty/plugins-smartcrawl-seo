import React from 'react';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import Notice from '../notices/notice';

export default function ConfigsFooter() {
	return (
		<Notice
			type="purple"
			message={createInterpolateElement(
				__(
					'Tired of saving, downloading and uploading your configs across your sites? WPMU DEV members use The Hub to easily apply configs to multiple sites at once… Unlock now with Pro!<br/> <a>Try The Hub</a>',
					'smartcrawl-seo'
				),
				{
					br: <br />,
					a: (
						<a
							target="_blank"
							className="sui-button sui-button-purple"
							href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_configs_upsell_notice"
							rel="noreferrer"
						>
							{__('Try The Hub', 'smartcrawl-seo')}
						</a>
					),
				}
			)}
		/>
	);
}
