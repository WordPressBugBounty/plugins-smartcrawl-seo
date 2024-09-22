<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Settings;
use SmartCrawl\Simple_Renderer;

class Structured_Data extends Check {
	const ID = 'structured-data';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Structured data is valid', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Structured data is invalid', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
