<?php
/**
 * Resolves the breadcrumb taxonomy term for a post.
 *
 * @since   3.16.0
 * @package SmartCrawl
 */

namespace SmartCrawl\Modules\Advanced\Breadcrumbs;

/**
 * Breadcrumb term resolver.
 */
class Term_Resolver {

	/**
	 * Get the breadcrumb term for a post.
	 *
	 * @param int $post_id Post ID.
	 * @param string $taxonomy Taxonomy name.
	 *
	 * @return false|\WP_Term
	 * @since 3.16.0
	 */
	public static function get_term( $post_id, $taxonomy ) {
		if ( empty( $post_id ) || empty( $taxonomy ) || ! taxonomy_exists( $taxonomy ) ) {
			return false;
		}

		$post = get_post( $post_id );
		if ( ! $post instanceof \WP_Post || ! is_object_in_taxonomy( $post->post_type, $taxonomy ) ) {
			return false;
		}

		$terms = wp_get_object_terms( $post_id, $taxonomy );
		if ( empty( $terms ) || is_wp_error( $terms ) ) {
			return false;
		}

		$assigned_ids = array_map( 'intval', wp_list_pluck( $terms, 'term_id' ) );

		$primary_id = (int) get_post_meta( $post_id, 'wds_primary_' . $taxonomy, true );
		if ( $primary_id && in_array( $primary_id, $assigned_ids, true ) ) {
			$primary = get_term( $primary_id, $taxonomy );
			if ( $primary instanceof \WP_Term ) {
				$descendant = self::get_deepest_descendant_of_primary( $terms, $primary, $taxonomy );

				return $descendant instanceof \WP_Term ? $descendant : $primary;
			}
		}

		return self::get_deepest_term( $terms, $taxonomy );
	}

	/**
	 * Get the deepest assigned term that is a child of the primary.
	 *
	 * @param \WP_Term[] $terms Assigned terms.
	 * @param \WP_Term $primary Primary term.
	 * @param string $taxonomy Taxonomy name.
	 *
	 * @return false|\WP_Term
	 * @since 3.16.0
	 */
	protected static function get_deepest_descendant_of_primary( array $terms, \WP_Term $primary, $taxonomy ) {
		$primary_id = $primary->term_id;

		return self::get_deepest_term_by_depth(
			$terms,
			$taxonomy,
			function ( $term ) use ( $primary_id, $taxonomy ) {
				if ( (int) $term->term_id === $primary_id ) {
					return false;
				}

				$ancestors = array_map( 'intval', get_ancestors( $term->term_id, $taxonomy, 'taxonomy' ) );

				return in_array( $primary_id, $ancestors, true );
			}
		);
	}

	/**
	 * Get the deepest assigned term by ancestor count.
	 *
	 * @param \WP_Term[] $terms Assigned terms.
	 * @param string $taxonomy Taxonomy name.
	 *
	 * @return false|\WP_Term
	 * @since 3.16.0
	 */
	protected static function get_deepest_term( array $terms, $taxonomy ) {
		return self::get_deepest_term_by_depth( $terms, $taxonomy );
	}

	/**
	 * Pick the assigned term with the greatest ancestor depth.
	 *
	 * @param \WP_Term[] $terms Assigned terms.
	 * @param string $taxonomy Taxonomy name.
	 * @param callable|null $predicate Optional. Return true to include a term.
	 *
	 * @return false|\WP_Term
	 * @since 3.16.0
	 */
	protected static function get_deepest_term_by_depth( array $terms, $taxonomy, $predicate = null ) {
		$deepest   = false;
		$max_depth = -1;

		foreach ( $terms as $term ) {
			if ( ! $term instanceof \WP_Term ) {
				continue;
			}

			if ( is_callable( $predicate ) && ! $predicate( $term ) ) {
				continue;
			}

			$depth = count( get_ancestors( $term->term_id, $taxonomy, 'taxonomy' ) );
			if ( $depth > $max_depth ) {
				$max_depth = $depth;
				$deepest   = $term;
			}
		}

		return $deepest instanceof \WP_Term ? $deepest : false;
	}
}
