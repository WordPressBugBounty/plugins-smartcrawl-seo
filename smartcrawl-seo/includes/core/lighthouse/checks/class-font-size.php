<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Lighthouse\Tables\Table;
use SmartCrawl\Simple_Renderer;

class Font_Size extends Check {
	const ID = 'font-size';

	public function prepare() {
		$this->set_success_title( esc_html__( 'Document uses legible font sizes', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( "Document doesn't use legible font sizes", 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
