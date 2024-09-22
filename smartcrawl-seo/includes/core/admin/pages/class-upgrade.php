<?php
/**
 * Class Upgrade
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Admin\Pages;

use SmartCrawl\Controllers\Assets;
use SmartCrawl\Simple_Renderer;
use SmartCrawl\Singleton;

/**
 * Upgrade page
 */
class Upgrade extends Page {

	use Singleton;

	const MENU_SLUG = 'wds_upgrade';

	/**
	 * Upgrade constructor.
	 */
	protected function init() {
		parent::init();

		add_action( 'admin_menu', array( $this, 'add_page' ), 100 );
		add_action( 'admin_head', array( $this, 'menu_style' ) );
	}

	/**
	 * Add page
	 */
	public function add_page() {
		add_submenu_page(
			'wds_wizard',
			esc_html__( 'Upgrade for 80% Off!', 'smartcrawl-seo' ),
			esc_html__( 'Upgrade for 80% Off!', 'smartcrawl-seo' ),
			'manage_options',
			'https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_submenu_upsell',
		);
	}

	/**
	 * Add custom style to the menu item
	 */
	public function menu_style() {
		echo '<style>
           #toplevel_page_wds_wizard ul.wp-submenu li:last-child a[href^="https://wpmudev.com"] { color: #fff !important; background: #8D00B1 !important; letter-spacing: -0.25px !important; font-weight: 500 !important; padding-right: 5px !important; }
       </style>';
		echo '<script>
		jQuery(function() {jQuery(\'#toplevel_page_wds_wizard ul.wp-submenu li:last-child a[href^="https://wpmudev.com"]\').attr("target", "_blank");});
		</script>';
	}

	/**
	 * Get menu slug
	 *
	 * @return string
	 */
	public function get_menu_slug() {
		return self::MENU_SLUG;
	}
}
