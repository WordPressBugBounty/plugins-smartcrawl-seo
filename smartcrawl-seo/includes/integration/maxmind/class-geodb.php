<?php
/**
 * Class to manage MaxMind GeoLite2-Country Database.
 *
 * @since   3.8.0
 * @package SmartCrawl
 */

namespace SmartCrawl\Integration\Maxmind;

use SmartCrawl\Singleton;

/**
 * MaxMind GeoLite2-Country Database class for free version.
 */
class GeoDB {

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
	 * Retrieves symbolized license key or empty string it not existing.
	 *
	 * @return string
	 */
	public function get_license() {
		return '';
	}
}
