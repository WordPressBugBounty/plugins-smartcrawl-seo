<?php
/**
 * Handles to add links in plugins.php page on Free version.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Controllers;

use SmartCrawl\Singleton;
use SmartCrawl\Settings;

/**
 * Plugins Links Controller for Free version.
 */
class Plugin_Links extends Controller {

	use Singleton;

	/**
	 * Initializes action hooks.
	 *
	 * @return void
	 */
	protected function init() {
		add_filter( 'plugin_action_links_' . SMARTCRAWL_PLUGIN_BASENAME, array( $this, 'add_settings_link' ) );
		add_filter( 'plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 2 );
	}

	/**
	 * Adds links to upgrade, docs, and dashboard in the plugins.php page.
	 *
	 * @param array $links The existing settings links array.
	 *
	 * @return array The modified settings links array.
	 */
	public function add_settings_link( $links ) {
		if ( ! is_array( $links ) ) {
			return $links;
		}

		array_unshift(
			$links,
			sprintf(
				'<a href="%s" style="color: #8D00B1;" target="_blank">%s</a>',
				'https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_pluginlist_upgrade',
				esc_html( __( 'Get SmartCrawl Pro', 'smartcrawl-seo' ) )
			)
		);

		array_unshift(
			$links,
			sprintf(
				'<a href="%s">%s</a>',
				'https://wpmudev.com/docs/wpmu-dev-plugins/smartcrawl/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_pluginlist_docs',
				esc_html( __( 'Docs', 'smartcrawl-seo' ) )
			)
		);

		array_unshift(
			$links,
			sprintf(
				'<a href="%s">%s</a>',
				\SmartCrawl\Admin\Settings\Admin_Settings::admin_url( Settings::TAB_DASHBOARD ),
				esc_html( __( 'Dashboard', 'smartcrawl-seo' ) )
			)
		);

		return $links;
	}

	/**
	 * Modifies the plugin meta data displayed on the plugin row.
	 *
	 * @param array  $plugin_meta The array of plugin meta data.
	 * @param string $plugin_file The path to the main plugin file.
	 *
	 * @return array The modified array of plugin meta data.
	 */
	public function plugin_row_meta( $plugin_meta, $plugin_file ) {
		if ( SMARTCRAWL_PLUGIN_BASENAME === $plugin_file ) {
			if ( isset( $plugin_meta[2] ) ) {
				$plugin_meta[1] = '<a href="https://profiles.wordpress.org/wpmudev/" target="_blank">' . esc_html__( 'WPMU DEV', 'smartcrawl-seo' ) . '</a>';
			}

			$row_meta = array(
				'rate'    => '<a href="https://wordpress.org/support/plugin/smartcrawl-seo/reviews/#new-post" target="_blank">' . esc_html__( 'Rate SmartCrawl', 'smartcrawl-seo' ) . '</a>',
				'support' => '<a href="https://wordpress.org/support/plugin/smartcrawl-seo/" target="_blank">' . esc_html__( 'Support', 'smartcrawl-seo' ) . '</a>',
				'roadmap' => '<a href="https://wpmudev.com/roadmap/" target="_blank">' . esc_html__( 'Roadmap', 'smartcrawl-seo' ) . '</a>',
			);

			$plugin_meta = array_merge( $plugin_meta, $row_meta );
		}

		return $plugin_meta;
	}
}
