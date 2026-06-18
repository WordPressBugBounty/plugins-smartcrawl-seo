<?php
/**
 * Breadcrumb builder for posts.
 *
 * @since   3.5.0
 * @package SmartCrawl
 */

namespace SmartCrawl\Modules\Advanced\Breadcrumbs\Builders;

use SmartCrawl\Modules\Advanced\Breadcrumbs\Helper;

/**
 * Pages breadcrumb class.
 */
class Posts extends Builder {

	/**
	 * Build items for breadcrumb.
	 *
	 * @since 3.5.0
	 *
	 * @return void
	 */
	protected function prepare_items() {
		$this->reset_items();

		if ( is_post_type_archive() ) {
			// Setup archive crumb.
			$this->maybe_set_post_archive_crumb();
		} else {
			// Setup single post crumbs.
			$this->prepare_single();
		}
	}

	/**
	 * Build items for single post breadcrumbs.
	 *
	 * @since 3.5.0
	 *
	 * @return void
	 */
	protected function prepare_single() {
		if ( 'post' === get_post_type() ) {
			// Setup blog page crumb.
			$this->maybe_set_posts_page_crumb();
			// Set category crumbs.
			$this->set_category_crumbs();
		} else {
			// Set taxonomy crumbs for custom post types.
			$this->set_custom_taxonomy_crumbs();
			// Set post parents crumbs.
			$this->maybe_set_post_ancestors_crumbs();
		}

		// Set current post crumb.
		if ( ! Helper::get_option( 'hide_post_title' ) ) {
			$this->add_item(
				array(
					'title' => $this->get_label( 'post', get_the_title() ),
				)
			);
		}
	}

	/**
	 * Set crumbs for post ancestor items.
	 *
	 * If the post is hierarchical and there are ancestors,
	 * set them to the crumbs item list.
	 *
	 * @since 3.5.0
	 *
	 * @return void
	 */
	protected function maybe_set_post_ancestors_crumbs() {
		global $post;

		$this->set_ancestor_crumbs(
			$post->ID,
			get_post_type(),
			'post_type'
		);
	}

	/**
	 * Set crumbs for post ancestor items.
	 *
	 * If the post is hierarchical and there are ancestors,
	 * set them to the crumbs item list.
	 *
	 * @since 3.5.0
	 *
	 * @param bool $archive Is it being called on an archive page?.
	 *
	 * @return void
	 */
	protected function maybe_set_post_archive_crumb( $archive = true ) {
		$post_type_name = get_post_type();
		$post_type      = get_post_type_object( $post_type_name );

		// If archive is enabled.
		if ( ! empty( $post_type ) && $post_type->has_archive ) {
			$item = array(
				'link'  => get_post_type_archive_link( $post_type_name ),
				'title' => $archive ? $this->get_archive_title( $post_type->labels->name ) : $post_type->labels->name,
			);

			$archive ? $this->add_item_with_paged( $item ) : $this->add_item( $item );
		}
	}

	/**
	 * Set crumbs for post ancestor items.
	 *
	 * If the post is hierarchical and there are ancestors,
	 * set them to the crumbs item list.
	 *
	 * @since 3.5.0
	 *
	 * @return void
	 */
	protected function maybe_set_posts_page_crumb() {
		// Get blog page if required.
		$blog_page = get_option( 'page_for_posts' );
		if ( ! empty( $blog_page ) ) {
			// Set blog page crumb.
			$this->add_item(
				array(
					'link'  => get_the_permalink( $blog_page ),
					'title' => get_the_title( $blog_page ),
				)
			);
		}
	}

	/**
	 * Set crumbs for category items.
	 *
	 * @since 3.5.0
	 *
	 * @return void
	 */
	protected function set_category_crumbs() {
		$category = $this->resolve_breadcrumb_term( 'category' );

		if ( $category instanceof \WP_Term ) {
			// Set ancestor crumbs.
			$this->set_ancestor_crumbs( $category->term_id, 'category' );

			// Add primary category crumb.
			$this->add_item(
				array(
					'link'  => get_category_link( $category->term_id ),
					'title' => $category->name,
				)
			);
		}
	}

	/**
	 * Set crumbs for custom taxonomy items.
	 *
	 * @since 3.16.0
	 *
	 * @return void
	 */
	protected function set_custom_taxonomy_crumbs() {
		global $post;

		$post_type = get_post_type( $post->ID );
		if ( ! $post_type ) {
			return;
		}

		// Get all hierarchical taxonomies for this post type.
		$taxonomies = get_object_taxonomies( $post_type, 'objects' );
		if ( empty( $taxonomies ) ) {
			return;
		}

		// Filter to only hierarchical taxonomies.
		$hierarchical_taxonomies = array_filter(
			$taxonomies,
			function ( $taxonomy ) {
				return $taxonomy->hierarchical;
			}
		);

		if ( empty( $hierarchical_taxonomies ) ) {
			return;
		}

		$taxonomy      = reset( $hierarchical_taxonomies );
		$taxonomy_name = $taxonomy->name;

		// Get primary term if available.
		$term = $this->get_primary_term( $taxonomy_name );

		if ( $term instanceof \WP_Term ) {
			$this->set_ancestor_crumbs( $term->term_id, $taxonomy_name );

			$term_link = get_term_link( $term->term_id, $taxonomy_name );
			$item      = array(
				'title' => $term->name,
			);
			if ( $term_link && ! is_wp_error( $term_link ) ) {
				$item['link'] = $term_link;
			}

			$this->add_item(
				$item
			);
		}
	}

	/**
	 * Get the primary term for a given taxonomy.
	 *
	 * @since 3.16.0
	 *
	 * @param string $taxonomy_name Taxonomy name.
	 *
	 * @return false|\WP_Term
	 */
	protected function get_primary_term( $taxonomy_name ) {
		global $post;

		if ( ! $post instanceof \WP_Post ) {
			return false;
		}

		if ( ! taxonomy_exists( $taxonomy_name ) || ! is_object_in_taxonomy( $post->post_type, $taxonomy_name ) ) {
			return false;
		}

		return $this->resolve_breadcrumb_term( $taxonomy_name );
	}

	/**
	 * Get the title for archive item.
	 *
	 * @since 3.5.0
	 *
	 * @param string $item_title Item title.
	 *
	 * @return string
	 */
	private function get_archive_title( $item_title ) {
		return $this->get_label(
			'archive',
			// translators: %s archive item title.
			sprintf( __( 'Archive for %s', 'smartcrawl-seo' ), $item_title )
		);
	}
}
