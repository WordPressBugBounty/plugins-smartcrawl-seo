<?php
/**
 * Instant Indexing Free settings
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Admin\Settings;

use SmartCrawl\Controllers\Assets;
use SmartCrawl\Settings;
use SmartCrawl\Singleton;

/**
 * Class Instant_Indexing_Free
 */
class Instant_Indexing extends Admin_Settings {

	use Singleton;

	/**
	 * Validate.
	 *
	 * @param array $input Input.
	 *
	 * @return array
	 */
	public function validate( $input ) {
		return $input;
	}

	/**
	 * Default settings
	 */
	public function defaults() {}

	/**
	 * Get the title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'Instant Indexing', 'smartcrawl-seo' );
	}

	/**
	 * Init the module.
	 *
	 * @return void
	 */
	public function init() {
		$this->option_name = 'wds_instant_indexing_options';
		$this->name        = Settings::COMP_INSTANT_INDEXING;
		$this->slug        = Settings::TAB_INSTANT_INDEXING;
		$this->action_url  = admin_url( 'options.php' );
		$this->page_title  = sprintf(
		/* translators: %s: plugin title */
			__( '%s Wizard: Instant Indexing', 'smartcrawl-seo' ),
			\smartcrawl_get_plugin_title()
		);

		parent::init();

		remove_action( 'admin_menu', array( $this, 'add_page' ) );
		add_action( 'admin_menu', array( $this, 'add_page' ), 96 );
		add_action( 'wds_plugin_update', array( $this, 'update_blog_settings' ) );
	}

	/**
	 * Add admin settings page
	 */
	public function options_page() {
		parent::options_page();

		wp_enqueue_script( Assets::INSTANT_INDEXING_PAGE_JS );
		wp_enqueue_media();

		$this->render_page( 'instant-indexing' );
	}

	/**
	 * Update blog settings to ensure Instant Indexing tab is enabled by default.
	 *
	 * @return void
	 */
	public function update_blog_settings(): void {
		$modules = get_site_option( 'wds_blog_tabs' );
		if ( $modules && ! isset( $modules[ Settings::TAB_INSTANT_INDEXING ] ) ) {
			$modules[ Settings::TAB_INSTANT_INDEXING ] = 1;
			update_site_option( 'wds_blog_tabs', $modules );
		}
	}
}