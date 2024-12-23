<?php
/**
 * Hub connector for Free version.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Controllers;

use SmartCrawl\Singleton;

/**
 * Hub Class for Free version.
 */
class Hub extends Hub_Abstract {

	use Singleton;

	/**
	 * Determins if the class's action hooks are already run.
	 *
	 * @var bool
	 */
	private $is_running = false;

	/**
	 * Boots controller listeners only once.
	 *
	 * @return bool
	 */
	public static function serve() {
		$me = self::get();

		if ( $me->is_running() ) {
			return false;
		}

		$me->add_hooks();

		return true;
	}

	/**
	 * Checks if we already have the actions bound.
	 *
	 * @return bool Status
	 */
	public function is_running() {
		return $this->is_running;
	}

	/**
	 * Binds listening actions.
	 */
	private function add_hooks() {
		add_filter( 'wdp_register_hub_action', array( $this, 'register_hub_actions' ) );

		$this->is_running = true;
	}

	/**
	 * Registers HUB actions.
	 *
	 * @param array $actions The hub actions array.
	 *
	 * @return array The modified hub actions array.
	 */
	public function register_hub_actions( $actions ) {
		if ( ! is_array( $actions ) ) {
			return $actions;
		}

		$actions['wds-seo-summary'] = array( $this, 'ajax_seo_summary' );
		$actions['wds-run-crawl']   = array( $this, 'ajax_run_crawl' );

		$actions['wds-apply-config']  = array( $this, 'ajax_apply_config' );
		$actions['wds-export-config'] = array( $this, 'ajax_export_config' );

		$actions['wds-refresh-lighthouse-report'] = array( $this, 'ajax_refresh_lighthouse_report' );

		return $actions;
	}
}
