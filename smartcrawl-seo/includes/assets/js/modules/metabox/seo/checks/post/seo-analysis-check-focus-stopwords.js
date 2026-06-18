import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import SeoAnalysisCheckItem from '../../seo-analysis-check-item';

export default class SeoAnalysisCheckFocusStopWords extends React.Component {
	static defaultProps = {
		keyword: '',
		data: {},
		onIgnore: () => false,
		onUnignore: () => false,
	};

	render() {
		const { data, onIgnore, onUnignore } = this.props;

		return (
			<SeoAnalysisCheckItem
				id="focus-stopwords"
				ignored={data.ignored}
				status={data.status}
				recommendation={this.getRecommendation()}
				statusMsg={this.getStatusMessage()}
				moreInfo={this.getMoreInfo()}
				onIgnore={onIgnore}
				onUnignore={onUnignore}
			/>
		);
	}

	getRecommendation() {
		const { state, phrase } = this.props.data.result;

		return (
			<p>
				{!!state
					? sprintf(
							/* translators: %s: keyphrase phrases */
							__(
								'You kept the focus %s of your article to the point, way to go!',
								'wds'
							),
							phrase
					  )
					: sprintf(
							/* translators: %s: keyphrase or key phrase label */
							__(
								'Your focus %s contains some words that might impact your SEO',
								'wds'
							),
							phrase
					  )}
			</p>
		);
	}

	getStatusMessage() {
		const { state } = this.props.data.result;

		return !state
			? __('There are stop words in focus keyphrases', 'smartcrawl-seo')
			: __('Focus to the point', 'smartcrawl-seo');
	}

	getMoreInfo() {
		return (
			<p>
				{__(
					'Stop words are words which can be considered insignificant in a search query, either because they are way too common, or because they do not convey much information. However, stop words should be used if it makes sense but try and avoid them in your URLs and title tags to improve clarity.',
					'wds'
				)}
			</p>
		);
	}
}
