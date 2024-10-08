<?php

namespace SmartCrawl\Schema\Fragments;

use SmartCrawl\Schema\Utils;

class Footer extends Fragment {
	/**
	 * @var
	 */
	private $url;
	/**
	 * @var
	 */
	private $title;
	/**
	 * @var
	 */
	private $description;
	/**
	 * @var Utils
	 */
	private $utils;

	/**
	 * @param $url
	 * @param $title
	 * @param $description
	 */
	public function __construct( $url, $title, $description ) {
		$this->url         = $url;
		$this->title       = $title;
		$this->description = $description;
		$this->utils       = Utils::get();
	}

	/**
	 * @return array|false
	 */
	protected function get_raw() {
		$enable_header_footer = (bool) $this->utils->get_schema_option( 'schema_wp_header_footer' );
		if ( ! $enable_header_footer ) {
			return false;
		}

		return array(
			'@type'         => 'WPFooter',
			'url'           => $this->url,
			'headline'      => $this->title,
			'description'   => $this->description,
			'copyrightYear' => gmdate( 'Y' ),
		);
	}
}
