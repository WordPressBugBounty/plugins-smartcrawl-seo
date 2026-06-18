class ConfigValues {
	static get(keys, scope = 'general') {
		if (!Array.isArray(keys)) {
			keys = [keys];
		}

		// Block editor: sidebar bundle loads without wds-metabox-components;
		// duplicate the metabox AJAX nonce on _wds_sidebar for analysis/focus.
		if (
			scope === 'metabox' &&
			keys.length === 1 &&
			keys[0] === 'nonce'
		) {
			const fromMetabox = window._wds_metabox?.nonce;
			if (fromMetabox) {
				return fromMetabox;
			}
			const fromSidebar = window._wds_sidebar?.nonce;
			if (fromSidebar) {
				return fromSidebar;
			}
			return '';
		}

		// Sidebar-only block editor: the sidebar bundle often loads without
		// wds-metabox-components, so _wds_metabox may be missing or not yet
		// defined when this module runs. Mirror these keys on _wds_sidebar (PHP)
		// and resolve metabox scope from metabox first, then sidebar.
		if (scope === 'metabox' && keys.length === 1) {
			const compatKey = keys[0];
			const compatKeys = [
				'gutenberg_active',
				'post_type',
				'taxonomies',
				'macros',
				'title_min_length',
				'title_max_length',
				'metadesc_min_length',
				'metadesc_max_length',
				'meta_title',
				'meta_desc',
				'post_url',
				'seo_title',
				'seo_desc',
				'primary_terms_active',
			];
			if (compatKeys.includes(compatKey)) {
				const mb = window._wds_metabox;
				if (mb && Object.prototype.hasOwnProperty.call(mb, compatKey)) {
					return mb[compatKey];
				}
				const sb = window._wds_sidebar;
				if (sb && Object.prototype.hasOwnProperty.call(sb, compatKey)) {
					return sb[compatKey];
				}
				if (compatKey === 'gutenberg_active') {
					return false;
				}
				if (compatKey === 'macros') {
					return {};
				}
				return '';
			}
		}

		let value = window['_wds_' + scope] || {};
		keys.forEach((key) => {
			if (value && value.hasOwnProperty(key)) {
				value = value[key];
			} else {
				value = '';
			}
		});

		return value;
	}

	static get_bool(varname, scope = 'general') {
		return !!this.get(varname, scope);
	}
}

export default ConfigValues;
