<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Lighthouse\Tables\Table;
use SmartCrawl\Simple_Renderer;

class Link_Text extends Check {
	const ID = 'link-text';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Links have descriptive text', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Links do not have descriptive text', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
