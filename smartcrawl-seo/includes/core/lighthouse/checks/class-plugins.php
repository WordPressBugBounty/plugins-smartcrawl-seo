<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Lighthouse\Tables\Table;
use SmartCrawl\Simple_Renderer;

class Plugins extends Check {
	const ID = 'plugins';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Document avoids browser plugins', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Document uses browser plugins', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
