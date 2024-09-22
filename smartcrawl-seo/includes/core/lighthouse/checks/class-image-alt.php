<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Lighthouse\Tables\Table;
use SmartCrawl\Simple_Renderer;

class Image_Alt extends Check {
	const ID = 'image-alt';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Image elements have [alt] attributes', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Image elements do not have [alt] attributes', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
