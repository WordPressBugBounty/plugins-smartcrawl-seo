<?php
/**
 * Class Controller_Free
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Instant_Indexing;

use SmartCrawl\Admin\Settings\Admin_Settings;
use SmartCrawl\Settings;
use SmartCrawl\Singleton;
use SmartCrawl\Controllers;

/**
 * Class Controller_Free
 */
class Controller extends Controllers\Controller {

	use Singleton;

	/**
	 * Should this module run?.
	 *
	 * @return bool
	 */
	public function should_run() {
		return true;
	}

	/**
	 * Initialize the module.
	 *
	 * @return void
	 */
	protected function init() {
	}
}
