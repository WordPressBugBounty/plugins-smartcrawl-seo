import React from 'react';
import { __ } from '@wordpress/i18n';

export default class SeoAnalysisTabLabel extends React.Component {
	static defaultProps = {
		isPrimary: false,
		hasError: false,
		text: '',
	};

	render() {
		const { isPrimary, hasError, text } = this.props;

		return (
			<React.Fragment>
				{!!hasError && (
					<span
						aria-hidden="true"
						className="sui-warning sui-icon-info"
						style={{ pointerEvents: 'none' }}
					/>
				)}
				{!hasError && (
					<span
						aria-hidden="true"
						className="sui-success sui-icon-check-tick"
					/>
				)}{' '}
				{text}{' '}
				{!!isPrimary && (
					<span
						className="sui-tag sui-tag-green wds-seo-primary-keyword-badge"
						style={{ pointerEvents: 'none' }}
					>
						{__('Primary', 'smartcrawl-seo')}
					</span>
				)}
			</React.Fragment>
		);
	}
}
