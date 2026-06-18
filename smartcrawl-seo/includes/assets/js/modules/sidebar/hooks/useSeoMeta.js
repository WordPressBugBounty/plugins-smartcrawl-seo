import wp from 'wp';

const { useSelect, useDispatch } = wp.data;

/**
 * Single hook for all SEO meta reads and writes in the Gutenberg sidebar.
 *
 * READ  — delegates to core/editor.getEditedPostAttribute('meta').
 *         This is the same store the block editor uses for its own fields,
 *         so it reflects unsaved in-memory changes immediately. No snapshot,
 *         no local copy.
 *
 * WRITE — delegates to core/editor.editPost({ meta }).
 *         editPost() performs a shallow merge into the store and marks the
 *         post dirty so the block editor's "Update" button activates.
 *         On save, Gutenberg sends these values in the REST PATCH body;
 *         WordPress core routes them to update_post_meta() via the
 *         registered meta schema (class-post-meta.php).
 *
 * This is the ONLY place in the sidebar that touches meta storage.
 * Panels and fields import this hook and receive typed getters/setters —
 * they never call wp.data directly.
 *
 * Keys mirror the ones written by Metabox::save_postdata() so the same
 * DB rows are used regardless of which editor the post was last saved in.
 */
const useSeoMeta = () => {
	/**
	 * Subscribe to the core/editor store.
	 * useSelect re-runs the selector whenever the store changes and
	 * triggers a re-render when the returned value is different —
	 * no deps array needed for store-backed selectors.
	 */
	const meta = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('meta') || {};
	});

	const { editPost } = useDispatch('core/editor');

	/**
	 * Write a single meta key without touching other keys.
	 *
	 * editPost({ meta: { key: value } }) performs a shallow merge in the
	 * store — it does NOT replace the whole meta object — so calling
	 * setField('_wds_title', x) leaves _wds_metadesc unchanged.
	 *
	 * @param {string} key   Meta key (must start with _wds_).
	 * @param {*}      value New value; type must match the registered schema.
	 */
	const setField = (key, value) => editPost({ meta: { [key]: value } });

	return {
		// ----------------------------------------------------------------
		// String fields
		// ----------------------------------------------------------------

		/** Custom SEO title. Empty string = fall back to post-type default. */
		seoTitle: meta['_wds_title'] ?? '',
		setSeoTitle: (v) => setField('_wds_title', v),

		/** Custom meta description. Empty string = fall back to default. */
		seoDesc: meta['_wds_metadesc'] ?? '',
		setSeoDesc: (v) => setField('_wds_metadesc', v),

		/**
		 * Comma-separated focus keyphrases, e.g. "broken screen,iphone repair".
		 * Stored as a single string to match the classic metabox format.
		 */
		focusKeywords: meta['_wds_focus-keywords'] ?? '',
		setFocusKeywords: (v) => setField('_wds_focus-keywords', v),

		/** Custom canonical URL. Empty = computed by the plugin. */
		canonical: meta['_wds_canonical'] ?? '',
		setCanonical: (v) => setField('_wds_canonical', v),

		/** 301 redirect destination. Empty = no redirect. */
		redirect: meta['_wds_redirect'] ?? '',
		setRedirect: (v) => setField('_wds_redirect', v),

		// ----------------------------------------------------------------
		// Robots booleans
		//
		// Which pair is active (noindex/nofollow vs index/follow) depends
		// on the post type's global default robots setting, supplied by
		// window._wds_sidebar.advanced.indexing.  Panels must check that
		// config to know which key to display.
		// ----------------------------------------------------------------

		robotsNoindex: meta['_wds_meta-robots-noindex'] ?? false,
		setRobotsNoindex: (v) => setField('_wds_meta-robots-noindex', v),

		robotsNofollow: meta['_wds_meta-robots-nofollow'] ?? false,
		setRobotsNofollow: (v) => setField('_wds_meta-robots-nofollow', v),

		/**
		 * Override to index when the post type is globally set to noindex.
		 * Only one of robotsNoindex / robotsIndex is relevant per post type.
		 */
		robotsIndex: meta['_wds_meta-robots-index'] ?? false,
		setRobotsIndex: (v) => setField('_wds_meta-robots-index', v),

		robotsFollow: meta['_wds_meta-robots-follow'] ?? false,
		setRobotsFollow: (v) => setField('_wds_meta-robots-follow', v),

		/**
		 * Advanced directives comma-string, e.g. "noarchive,nosnippet".
		 * Sanitized server-side to only allow the four permitted values.
		 */
		robotsAdv: meta['_wds_meta-robots-adv'] ?? '',
		setRobotsAdv: (v) => setField('_wds_meta-robots-adv', v),

		// ----------------------------------------------------------------
		// Auto-linking (Pro)
		// ----------------------------------------------------------------

		autolinksExclude: meta['_wds_autolinks-exclude'] ?? false,
		setAutolinksExclude: (v) => setField('_wds_autolinks-exclude', v),

		// ----------------------------------------------------------------
		// Social meta — objects
		//
		// May be null before the first save on a new post.  Panels must
		// guard with (opengraph ?? {}) before reading nested properties.
		// ----------------------------------------------------------------

		/**
		 * OpenGraph object: { title, description, disabled, images[] }
		 * Write the full updated object back to preserve sibling keys.
		 */
		opengraph: meta['_wds_opengraph'] ?? null,
		setOpengraph: (v) => setField('_wds_opengraph', v),

		/**
		 * Twitter/X card object: same shape as opengraph, images is single.
		 */
		twitter: meta['_wds_twitter'] ?? null,
		setTwitter: (v) => setField('_wds_twitter', v),
	};
};

export default useSeoMeta;
