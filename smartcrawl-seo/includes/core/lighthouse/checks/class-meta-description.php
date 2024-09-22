<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Settings;
use SmartCrawl\Simple_Renderer;
use SmartCrawl\Admin\Settings\Admin_Settings;

class Meta_Description extends Check {
	const ID = 'meta-description';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Document has a meta description', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Document does not have a meta description', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
