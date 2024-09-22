<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Lighthouse\Tables;
use SmartCrawl\Simple_Renderer;

class Tap_Targets extends Check {
	const ID = 'tap-targets';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Tap targets are sized appropriately', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Tap targets are not sized appropriately', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
