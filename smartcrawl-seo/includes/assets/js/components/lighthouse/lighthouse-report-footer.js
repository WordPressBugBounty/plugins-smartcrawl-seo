import React from 'react';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import Button from '../button';
import Notice from '../notices/notice';
export default function LighthouseReportFooter() {
	return (
		<div className="wds-vertical-tab-section sui-box">
			<div id="wds-lighthouse-report-upsell-notice">
				<Notice
					type="purple"
					message={createInterpolateElement(
						__(
							'Upgrade to Pro to schedule automated tests and send white label email reports directly to your clients. Never miss a beat with your search engine optimization.<br/> <a/>',
							'smartcrawl-seo'
						),
						{
							br: <br />,
							a: (
								<Button
									target="_blank"
									color="purple"
									text={__(
										'Unlock now with Pro',
										'smartcrawl-seo'
									)}
									href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_lighthouse_report_upsell_notice"
								/>
							),
						}
					)}
				/>
			</div>
		</div>
	);
}
