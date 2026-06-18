import { __ } from '@wordpress/i18n';
import wp from 'wp';
import ConfigValues from '../../../es6/config-values';
import RequestUtil from '../../../utils/request-util';

const { useEffect, useState, useCallback } = wp.element;
const { useSelect } = wp.data;

/**
 * Moz tab panel (Gutenberg sidebar).
 */
export default function MozPanel() {
	const postId = useSelect(
		(select) => select('core/editor')?.getCurrentPostId?.(),
		[]
	);
	const postStatus = useSelect(
		(select) => select('core/editor')?.getEditedPostAttribute?.('status'),
		[]
	);

	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [blocked, setBlocked] = useState(false);
	const [attribution, setAttribution] = useState('#');
	const [urlmetrics, setUrlmetrics] = useState({});

	const isBlockedByStatus = ['auto-draft', 'draft', 'pending'].includes(
		postStatus || ''
	);

	const fetchMetrics = useCallback(() => {
		if (!postId) {
			setLoading(false);
			return;
		}
		setLoading(true);
		setErrorMessage('');

		RequestUtil.post(
			'wds_get_moz_urlmetrics',
			ConfigValues.get('nonce', 'metabox'),
			{ post_id: postId }
		)
			.then((resp) => {
				setBlocked(!!resp?.blocked);
				setAttribution(resp?.attribution || '#');
				setUrlmetrics(resp?.urlmetrics || {});
				setLoading(false);
			})
			.catch((msg) => {
				setBlocked(false);
				setAttribution('#');
				setUrlmetrics({});
				setErrorMessage(
					msg ||
						__(
							'We were unable to retrieve data from the Moz API.',
							'smartcrawl-seo'
						)
				);
				setLoading(false);
			});
	}, [postId]);

	useEffect(() => {
		// Mirror metabox behavior: don't fetch for draft-like statuses.
		if (isBlockedByStatus) {
			setBlocked(true);
			setLoading(false);
			setErrorMessage('');
			setAttribution('#');
			setUrlmetrics({});
			return;
		}
		fetchMetrics();
	}, [fetchMetrics, isBlockedByStatus]);

	return (
		<div
			className="wds-moz-tab wds-sidebar-tab-panel wds-sidebar-tab-panel--moz"
			role="tabpanel"
			id="wds-sidebar-tabpanel-moz"
			aria-labelledby="wds-sidebar-tab-moz"
		>
			<div className="wds-metabox-section sui-box-body">
				{isBlockedByStatus && (
					<div className="sui-notice sui-notice-info">
						<div className="sui-notice-content">
							<div className="sui-notice-message">
								<p>
									{__(
										'Moz metrics will be available once the post is published.',
										'smartcrawl-seo'
									)}
								</p>
							</div>
						</div>
					</div>
				)}

				{!!errorMessage && (
					<div className="sui-notice sui-notice-error">
						<div className="sui-notice-content">
							<div className="sui-notice-message">
								<p>{errorMessage}</p>
							</div>
						</div>
					</div>
				)}

				{loading && (
					<p className="sui-description">
						{__('Loading Moz metrics…', 'smartcrawl-seo')}
					</p>
				)}

				{!loading && !blocked && !errorMessage && (
					<div
						className="wds-moz-metrics"
						aria-label={__('Moz metrics', 'smartcrawl-seo')}
					>
						<div className="wds-moz-row">
							<div className="wds-moz-metric">
								<span className="wds-moz-label">
									{__('External Links', 'smartcrawl-seo')}
								</span>
								<a
									className="wds-moz-help"
									href="https://moz.com/learn/seo/external-link"
									target="_blank"
									rel="noreferrer"
								>
									(?)
								</a>
							</div>
							<div className="wds-moz-value">
								<a
									href={attribution}
									target="_blank"
									rel="noreferrer"
								>
									{urlmetrics?.ueid ?? '0'}
								</a>
							</div>
						</div>

						<div className="wds-moz-row">
							<div className="wds-moz-metric">
								<span className="wds-moz-label">
									{__('Links', 'smartcrawl-seo')}
								</span>
								<a
									className="wds-moz-help"
									href="https://moz.com/learn/seo/internal-link"
									target="_blank"
									rel="noreferrer"
								>
									(?)
								</a>
							</div>
							<div className="wds-moz-value">
								<a
									href={attribution}
									target="_blank"
									rel="noreferrer"
								>
									{urlmetrics?.uid ?? '0'}
								</a>
							</div>
						</div>

						<div className="wds-moz-row">
							<div className="wds-moz-metric">
								<span className="wds-moz-label">
									{__('mozRank', 'smartcrawl-seo')}
								</span>
								<a
									className="wds-moz-help"
									href="https://moz.com/learn/seo/mozrank"
									target="_blank"
									rel="noreferrer"
								>
									(?)
								</a>
							</div>
							<div className="wds-moz-value wds-moz-value--stack">
								<div className="wds-moz-subvalue">
									<span className="wds-moz-subvalue-label">
										{__('10-point', 'smartcrawl-seo')}
									</span>
									<a
										href={attribution}
										target="_blank"
										rel="noreferrer"
									>
										{urlmetrics?.umrp ?? '--'}
									</a>
								</div>
								<div className="wds-moz-subvalue">
									<span className="wds-moz-subvalue-label">
										{__('Raw', 'smartcrawl-seo')}
									</span>
									<a
										href={attribution}
										target="_blank"
										rel="noreferrer"
									>
										{urlmetrics?.umrr ?? '--'}
									</a>
								</div>
							</div>
						</div>

						<div className="wds-moz-row">
							<div className="wds-moz-metric">
								<span className="wds-moz-label">
									{__('Page Authority', 'smartcrawl-seo')}
								</span>
								<a
									className="wds-moz-help"
									href="https://moz.com/learn/seo/page-authority"
									target="_blank"
									rel="noreferrer"
								>
									(?)
								</a>
							</div>
							<div className="wds-moz-value">
								<a
									href={attribution}
									target="_blank"
									rel="noreferrer"
								>
									{urlmetrics?.upa ?? '0'}
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
