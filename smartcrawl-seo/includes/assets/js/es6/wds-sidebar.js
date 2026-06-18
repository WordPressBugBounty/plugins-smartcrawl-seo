import wp from 'wp';
import SmartCrawlSidebar from '../modules/sidebar/SmartCrawlSidebar';
import SmartCrawlIcon from '../modules/sidebar/SmartCrawlIcon';

/**
 * Register the SmartCrawl SEO Gutenberg sidebar.
 *
 * This file is the webpack entry point for the sidebar bundle.
 * It is only enqueued on block-editor post-edit screens (see
 * Controllers\Assets::register_sidebar_scripts()).
 *
 * registerPlugin is available via wp-plugins (WordPress script handle),
 * declared as a PHP dependency so WordPress guarantees it is loaded
 * before this bundle runs.
 */
if (wp && wp.plugins && wp.plugins.registerPlugin) {
	wp.plugins.registerPlugin('wds-seo-sidebar', {
		icon: wp.element.createElement(SmartCrawlIcon),
		render: SmartCrawlSidebar,
	});
}
