<?php
/**
 * Controls MaxMind functionality.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Integration\Maxmind;

use SmartCrawl\Controllers;
use SmartCrawl\Singleton;

/**
 * MaxMind main controller for free version.
 */
class Controller extends Controllers\Controller {

	use Singleton;

	/**
	 * Checks if current module is active.
	 *
	 * @return bool
	 */
	public function is_active() {
		return false;
	}

	/**
	 * Initialize.
	 *
	 * @return boolean
	 */
	public function init() {
		return false;
	}
}
