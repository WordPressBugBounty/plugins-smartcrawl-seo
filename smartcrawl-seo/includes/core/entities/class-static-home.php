<?php
/**
 * Static Homepage Entity.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Entities;

/**
 * TODO: rename this and the schema fragment to be more clear
 */

/**
 * Static_Home Post Entity class.
 */
class Static_Home extends Post {
	/**
	 * WP Posts.
	 *
	 * @var \WP_Post[]
	 */
	private $posts;
	/**
	 * Page numbrer.
	 *
	 * @var int
	 */
	private $page_number;

	/**
	 * Class constructor.
	 *
	 * @param \WP_Post[] $posts Array of posts.
	 * @param int        $page_number Page number.
	 */
	public function __construct( $posts = array(), $page_number = 0 ) {
		parent::__construct( get_option( 'page_for_posts' ) );

		$this->posts       = $posts;
		$this->page_number = $page_number;
	}

	/**
	 * Loads the schema for the homepage.
	 *
	 * @return array The loaded schema for the homepage.
	 */
	protected function load_schema() {
		$schema = new \SmartCrawl\Schema\Fragments\Static_Home(
			$this->posts,
			$this->get_meta_title(),
			$this->get_meta_description()
		);

		return $schema->get_schema();
	}

	/**
	 * Loads the canonical URL for the homepage with appended page number.
	 *
	 * @return string The canonical URL with appended page number.
	 */
	protected function load_canonical_url() {
		return \smartcrawl_append_archive_page_number(
			parent::load_canonical_url(),
			$this->page_number
		);
	}

	/**
	 * Load OpenGraph tags.
	 *
	 * @return array The updated OpenGraph tags.
	 */
	protected function load_opengraph_tags() {
		$tags = parent::load_opengraph_tags();

		$tags['og:type'] = 'website';

		return $tags;
	}
}
