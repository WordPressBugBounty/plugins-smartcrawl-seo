<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Lighthouse\Tables\Table;
use SmartCrawl\Simple_Renderer;

class Hreflang extends Check {
	const ID = 'hreflang';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Document has a valid hreflang', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( "Document doesn't have a valid hreflang", 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
