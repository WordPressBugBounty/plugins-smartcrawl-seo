<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Cache\Post_Cache;
use SmartCrawl\Entities\Blog_Home;
use SmartCrawl\Lighthouse\Tables\Table;
use SmartCrawl\Settings;
use SmartCrawl\Simple_Renderer;
use SmartCrawl\Admin\Settings\Admin_Settings;

class Is_Crawlable extends Check {
	const ID = 'is-crawlable';

	/**
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( "Page isn't blocked from indexing", 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( 'Page is blocked from indexing', 'smartcrawl-seo' ) );
	}

	/**
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
