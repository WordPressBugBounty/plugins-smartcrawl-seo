<?php

namespace SmartCrawl\Controllers;

use SmartCrawl\Singleton;

class Hub extends Hub_Abstract {

	use Singleton;

	private $is_running = false;

	/**
	 * Boot controller listeners
	 *
	 * Do it only once, if they're already up do nothing
	 *
	 * @return bool Status
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
	 * Check if we already have the actions bound
	 *
	 * @return bool Status
	 */
	public function is_running() {
		return $this->is_running;
	}

	/**
	 * Bind listening actions
	 */
	private function add_hooks() {
		add_filter( 'wdp_register_hub_action', array( $this, 'register_hub_actions' ) );

		$this->is_running = true;
	}

	public function register_hub_actions( $actions ) {
		if ( ! is_array( $actions ) ) {
			return $actions;
		}

		$actions['wds-seo-summary'] = array( $this, 'json_seo_summary' );
		$actions['wds-run-crawl']   = array( $this, 'json_run_crawl' );

		$actions['wds-apply-config']  = array( $this, 'apply_config' );
		$actions['wds-export-config'] = array( $this, 'export_config' );

		$actions['wds-refresh-lighthouse-report'] = array( $this, 'json_refresh_lighthouse_report' );

		return $actions;
	}
}
