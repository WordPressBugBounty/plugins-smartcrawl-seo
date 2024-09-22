<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Lighthouse\Tables\Table;
use SmartCrawl\Settings;
use SmartCrawl\Simple_Renderer;
use SmartCrawl\Admin\Settings\Admin_Settings;

class Robots_Txt extends Check {
	const ID = 'robots-txt';

	/**
	 * @return mixed|void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'robots.txt is valid', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'robots.txt is not valid', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
