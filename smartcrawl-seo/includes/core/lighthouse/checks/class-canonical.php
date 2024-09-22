<?php

namespace SmartCrawl\Lighthouse\Checks;

class Canonical extends Check {
	const ID = 'canonical';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Document has a valid rel=canonical', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Document does not have a valid rel=canonical', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
