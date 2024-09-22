<?php

namespace SmartCrawl\Lighthouse\Checks;

class Document_Title extends Check {
	const ID = 'document-title';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Document has a <title> element', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( "Document doesn't have a <title> element", 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
