/**
 * Readability tab — same UI as metabox: MetaboxReadability
 * (intro + ReadabilityAnalysisContainer). Data from wds_analysis_get_editor_analysis
 * with the same payload as metabox/metabox.js refreshAnalysis.
 */
import wp from 'wp';
import ConfigValues from '../../../es6/config-values';
import GutenbergEditor from '../../../es6/gutenberg-editor';
import RequestUtil from '../../../utils/request-util';
import useSeoMeta from '../hooks/useSeoMeta';
import MetaboxReadability from '../../metabox/metabox-readability';

const {
	useState,
	useEffect,
	useRef,
	useCallback,
	createElement,
	Fragment,
} = wp.element;

/** @jsx createElement */
/** @jsxFrag Fragment */

function splitFocusKeywords(commaString) {
	return (commaString || '')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
}

export default function ReadabilityPanel({ onReadabilityForTab }) {
	const { seoTitle, seoDesc, focusKeywords } = useSeoMeta();

	const [readability, setReadability] = useState({});
	const [loading, setLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const editorRef = useRef(null);
	const pendingRefreshButtonRef = useRef(false);
	if (!editorRef.current) {
		editorRef.current = new GutenbergEditor();
	}

	const latestRef = useRef({});
	latestRef.current = {
		seoTitle: seoTitle != null ? seoTitle : '',
		seoDesc: seoDesc != null ? seoDesc : '',
		keywords: splitFocusKeywords(focusKeywords),
	};

	const runRefresh = useCallback((dirty) => {
		const editor = editorRef.current;
		if (!editor) {
			if (pendingRefreshButtonRef.current) {
				pendingRefreshButtonRef.current = false;
				setIsRefreshing(false);
			}
			return;
		}
		const snap = latestRef.current;

		setLoading(true);
		RequestUtil.post(
			'wds_analysis_get_editor_analysis',
			ConfigValues.get('nonce', 'metabox'),
			{
				post_id: editor.get_data().get_id(),
				is_dirty:
					dirty || editor.is_post_dirty() ? 1 : 0,
				wds_title: snap.seoTitle,
				wds_description: snap.seoDesc,
				wds_focus_keywords: snap.keywords.join(','),
			}
		)
			.then((resp) => {
				setReadability(resp?.readability || {});
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			})
			.finally(() => {
				if (pendingRefreshButtonRef.current) {
					pendingRefreshButtonRef.current = false;
					setIsRefreshing(false);
				}
			});
	}, []);

	useEffect(() => {
		latestRef.current = {
			...latestRef.current,
			keywords: splitFocusKeywords(focusKeywords),
		};
	}, [focusKeywords]);

	useEffect(() => {
		latestRef.current = {
			...latestRef.current,
			seoTitle: seoTitle != null ? seoTitle : '',
			seoDesc: seoDesc != null ? seoDesc : '',
		};
	}, [seoTitle, seoDesc]);

	useEffect(() => {
		runRefresh(false);
	}, [runRefresh]);

	useEffect(() => {
		if (typeof onReadabilityForTab === 'function') {
			onReadabilityForTab(readability, loading);
		}
	}, [readability, loading, onReadabilityForTab]);

	useEffect(() => {
		const editor = editorRef.current;
		if (!editor || typeof editor.addEventListener !== 'function') {
			return undefined;
		}
		const onAutosave = () => runRefresh(true);
		editor.addEventListener('autosave', onAutosave);
		return () => {
			if (typeof editor.removeEventListener === 'function') {
				editor.removeEventListener('autosave', onAutosave);
			}
			if (typeof editor.destroy === 'function') {
				editor.destroy();
			}
			editorRef.current = null;
		};
	}, [runRefresh]);

	const handleRefresh = useCallback(() => {
		if (isRefreshing || loading) {
			return;
		}
		pendingRefreshButtonRef.current = true;
		setIsRefreshing(true);
		try {
			editorRef.current?.autosave?.();
		} catch (e) {
			console.error('Autosave failed during readability refresh', e);
		}
		runRefresh(true);
	}, [isRefreshing, loading, runRefresh]);

	if (!ConfigValues.get_bool('readability_active', 'sidebar')) {
		return null;
	}

	// Scope root for sidebar-only readability CSS (metabox parity). Keeps future SUI
	// imports isolated from the block canvas. QA: [data-wds-scope="readability-sidebar"].
	return (
		<div
			className="wds-sidebar-readability-scope"
			data-wds-scope="readability-sidebar"
		>
			<MetaboxReadability
				analysis={readability}
				loading={loading}
				isRefreshing={isRefreshing}
				onRefresh={handleRefresh}
				useReactAccordion
			/>
		</div>
	);
}
