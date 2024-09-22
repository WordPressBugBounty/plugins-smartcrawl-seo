<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Simple_Renderer;

class Http_Status_Code extends Check {
	const ID = 'http-status-code';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Page has successful HTTP status code', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Page has unsuccessful HTTP status code', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
