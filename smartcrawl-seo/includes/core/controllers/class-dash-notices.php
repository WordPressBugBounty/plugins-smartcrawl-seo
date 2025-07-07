<?php
/**
 * Handles Dashboard Notices on Free version.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Controllers;

$file_path = SMARTCRAWL_PLUGIN_DIR . 'external/free-dashboard/module.php';
if ( ! file_exists( $file_path ) ) {
	return;
}

require_once $file_path;

use SmartCrawl\Singleton;

/**
 * Dash_Notices Controller for Free version.
 */
class Dash_Notices extends Controller {

	use Singleton;

	/**
	 * Initializes action hooks.
	 *
	 * @return void
	 */
	protected function init() {
		add_action( 'admin_init', array( $this, 'register_notices' ) );
	}

	/**
	 * Registers SmartCrawl notices.
	 *
	 * @return void
	 */
	public function register_notices() {
		$installed_on = get_site_option( 'wds-free-install-date', time() );

		do_action(
			'wpmudev_register_notices',
			'smartcrawl',
			array(
				'basename'     => SMARTCRAWL_PLUGIN_BASENAME,
				'title'        => 'SmartCrawl',
				'wp_slug'      => 'smartcrawl-seo',
				'installed_on' => $installed_on,
				'screens'      => array(
					'toplevel_page_wds_wizard',
					'smartcrawl_page_wds_health',
					'smartcrawl_page_wds_onpage',
					'smartcrawl_page_wds_social',
					'smartcrawl_page_wds_instant_indexing',
					'smartcrawl_page_wds_sitemap',
					'smartcrawl_page_wds_autolinks',
					'smartcrawl_page_wds_settings',
				),
			)
		);
	}
}
