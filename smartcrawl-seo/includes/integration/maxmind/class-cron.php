<?php
/**
 * Handles cron jobs for Maxmind.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Integration\Maxmind;

use SmartCrawl\Admin\Settings\Admin_Settings;
use SmartCrawl\Controllers;
use SmartCrawl\Logger;
use SmartCrawl\Settings;
use SmartCrawl\Singleton;

/**
 * Cron Controller
 */
class Cron extends Controllers\Controller {

	use Singleton;

	const EVENT_HOOK = 'wds_cron_download_geodb';

	/**
	 * Includes methods which will be executed always.
	 *
	 * @return void
	 */
	protected function always() {
		wp_clear_scheduled_hook( self::EVENT_HOOK );
	}

	/**
	 * Checks if this controller can be run.
	 *
	 * @return bool
	 */
	public function should_run() {
		return false;
	}

	/**
	 * Includes methods which are executed when the controller is running.
	 *
	 * @return void
	 */
	protected function init() {}
}
