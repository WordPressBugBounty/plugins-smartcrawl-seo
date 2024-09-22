<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Simple_Renderer;

class Viewport extends Check {
	const ID = 'viewport';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Has a <meta name="viewport"> tag with width or initial-scale', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Does not have a <meta name="viewport"> tag with width or initial-scale', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
