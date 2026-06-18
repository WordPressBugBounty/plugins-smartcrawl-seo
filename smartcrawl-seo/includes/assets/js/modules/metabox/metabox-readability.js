import React from 'react';
import { __ } from '@wordpress/i18n';
import ReadabilityAnalysisContainer from './readability/readability-analysis-container';

export default class MetaboxReadability extends React.Component {
	static defaultProps = {
		analysis: {},
		loading: false,
		isRefreshing: false,
		onRefresh: () => false,
		useReactAccordion: false,
	};

	render() {
		const {
			analysis,
			loading,
			isRefreshing,
			onRefresh,
			useReactAccordion,
		} = this.props;

		return (
			<div className="wds_readability">
				<div className="wds-metabox-section">
					<p>
						<small>
							{__(
								"We've analyzed your content to see how readable it is for the average person. Suggestions are based on best practice, but only you can decide what works for you and your readers.",
								'wds'
							)}
						</small>
					</p>

					<ReadabilityAnalysisContainer
						analysis={analysis}
						loading={loading}
						isRefreshing={isRefreshing}
						onRefresh={onRefresh}
						useReactAccordion={useReactAccordion}
					/>
				</div>
			</div>
		);
	}
}
