<?php

namespace SmartCrawl\Lighthouse\Checks;

class Crawlable_Anchors extends Check {
	const ID = 'crawlable-anchors';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Links are crawlable', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Links are not crawlable', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
