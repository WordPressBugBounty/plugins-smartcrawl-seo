<?php
/**
 * Registers post meta keys for the REST API.
 *
 * All SEO meta keys that must be readable/writable via the block editor are
 * declared here with show_in_rest = true.  This controller intentionally runs
 * in Init::common() so that the registrations are present for every request
 * context — admin, REST API, and front-end — not just admin.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Controllers;

use SmartCrawl\Singleton;

/**
 * Post meta registration controller.
 */
class Post_Meta extends Controller {

	use Singleton;

	/**
	 * Registers hooks.
	 *
	 * @return void
	 */
	protected function init() {
		add_action( 'init', array( $this, 'register_seo_post_meta' ) );
	}

	/**
	 * Registers all SEO post meta keys with the REST API.
	 *
	 * An empty string as the post-type argument means "all post types",
	 * matching the scope used by the classic save_postdata() path.
	 *
	 * @return void
	 */
	public function register_seo_post_meta() {
		// ----------------------------------------------------------------
		// Shared auth callbacks
		// ----------------------------------------------------------------

		/**
		 * Most fields: current user must be able to edit the post AND
		 * must pass the plugin-level permission check for the SEO meta box.
		 *
		 * Protected meta keys (prefixed with _) default to __return_false,
		 * so we must supply an explicit callback for every key we want
		 * writable via the REST API.
		 */
		$edit_post_auth = function ( $allowed, $meta_key, $post_id, $user_id, $cap, $caps ) {
			return current_user_can( 'edit_post', (int) $post_id )
				&& function_exists( '\user_can_see_seo_metabox' )
				&& \user_can_see_seo_metabox();
		};

		/**
		 * 301 Redirect field: edit capability + the plugin-level
		 * permission check that mirrors the classic metabox guard.
		 */
		$redirect_auth = function ( $allowed, $meta_key, $post_id, $user_id, $cap, $caps ) {
			return current_user_can( 'edit_post', (int) $post_id )
				&& function_exists( '\user_can_see_seo_metabox' )
				&& \user_can_see_seo_metabox()
				&& function_exists( 'user_can_see_seo_metabox_301_redirect' )
				&& \user_can_see_seo_metabox_301_redirect();
		};

		$seo_show_in_rest = function_exists( '\user_can_see_seo_metabox' )
			&& \user_can_see_seo_metabox();

		// ----------------------------------------------------------------
		// Plain-string fields (macro-aware sanitization)
		// ----------------------------------------------------------------

		foreach ( array( '_wds_title', '_wds_metadesc', '_wds_focus-keywords' ) as $key ) {
			register_post_meta(
				'',
				$key,
				array(
					'show_in_rest'      => $seo_show_in_rest,
					'single'            => true,
					'type'              => 'string',
					'sanitize_callback' => 'smartcrawl_sanitize_preserve_macros',
					'auth_callback'     => $edit_post_auth,
				)
			);
		}

		// ----------------------------------------------------------------
		// Advanced robots directives: "noarchive,nosnippet" style string
		// ----------------------------------------------------------------

		register_post_meta(
			'',
			'_wds_meta-robots-adv',
			array(
				'show_in_rest'      => $seo_show_in_rest,
				'single'            => true,
				'type'              => 'string',
				'sanitize_callback' => array( $this, 'sanitize_robots_adv' ),
				'auth_callback'     => $edit_post_auth,
			)
		);

		// ----------------------------------------------------------------
		// Boolean robots toggles and auto-linking exclude
		// ----------------------------------------------------------------

		$boolean_keys = array(
			'_wds_meta-robots-noindex',
			'_wds_meta-robots-nofollow',
			'_wds_meta-robots-index',
			'_wds_meta-robots-follow',
			'_wds_autolinks-exclude', // @smartcrawl-pro
		);

		foreach ( $boolean_keys as $key ) {
			register_post_meta(
				'',
				$key,
				array(
					'show_in_rest'  => $seo_show_in_rest,
					'single'        => true,
					'type'          => 'boolean',
					'default'       => false,
					'auth_callback' => $edit_post_auth,
				)
			);
		}

		// ----------------------------------------------------------------
		// URL fields
		// ----------------------------------------------------------------

		register_post_meta(
			'',
			'_wds_canonical',
			array(
				'show_in_rest'      => $seo_show_in_rest,
				'single'            => true,
				'type'              => 'string',
				'sanitize_callback' => 'esc_url_raw',
				'auth_callback'     => $edit_post_auth,
			)
		);

		$redirect_show_in_rest = $seo_show_in_rest
			&& function_exists( '\user_can_see_seo_metabox_301_redirect' )
			&& \user_can_see_seo_metabox_301_redirect();

		register_post_meta(
			'',
			'_wds_redirect',
			array(
				'show_in_rest'      => $redirect_show_in_rest,
				'single'            => true,
				'type'              => 'string',
				'sanitize_callback' => 'esc_url_raw',
				'auth_callback'     => $redirect_auth,
			)
		);

		// ----------------------------------------------------------------
		// Social meta — OpenGraph and Twitter/X (object type)
		// ----------------------------------------------------------------

		$social_schema = array(
			'type'                 => 'object',
			'properties'           => array(
				'title'       => array( 'type' => 'string' ),
				'description' => array( 'type' => 'string' ),
				'disabled'    => array( 'type' => 'boolean' ),
				'images'      => array(
					'type'  => 'array',
					'items' => array( 'type' => array( 'integer', 'string' ) ),
				),
			),
			'additionalProperties' => false,
		);

		foreach ( array( '_wds_opengraph', '_wds_twitter' ) as $key ) {
			register_post_meta(
				'',
				$key,
				array(
					'show_in_rest'      => $seo_show_in_rest ? array( 'schema' => $social_schema ) : false,
					'single'            => true,
					'type'              => 'object',
					'sanitize_callback' => array( $this, 'sanitize_social_meta' ),
					'auth_callback'     => $edit_post_auth,
				)
			);
		}
	}

	/**
	 * Sanitizes a social meta object (OpenGraph or Twitter).
	 *
	 * Mirrors the field-by-field logic in Metabox::get_social_meta() so that
	 * REST API writes go through the same sanitization as classic form saves.
	 *
	 * @param mixed $value Raw value from the REST request (PHP array after JSON decode).
	 *
	 * @return array
	 */
	public function sanitize_social_meta( $value ) {
		if ( ! is_array( $value ) ) {
			return array();
		}

		$result = array();

		if ( ! empty( $value['disabled'] ) ) {
			$result['disabled'] = true;
		}

		if ( ! empty( $value['title'] ) ) {
			$result['title'] = \smartcrawl_sanitize_preserve_macros( (string) $value['title'] );
		}

		if ( ! empty( $value['description'] ) ) {
			$result['description'] = \smartcrawl_sanitize_preserve_macros( (string) $value['description'] );
		}

		if ( ! empty( $value['images'] ) && is_array( $value['images'] ) ) {
			$result['images'] = array();
			foreach ( $value['images'] as $img ) {
				$result['images'][] = is_numeric( $img ) ? (int) $img : esc_url_raw( (string) $img );
			}
		}

		return $result;
	}

	/**
	 * Sanitizes the advanced robots directive string.
	 *
	 * Only allows the four directives that the classic metabox supports,
	 * stored as a comma-separated string (e.g. "noarchive,nosnippet").
	 *
	 * @param mixed $value Raw value.
	 *
	 * @return string
	 */
	public function sanitize_robots_adv( $value ) {
		if ( empty( $value ) ) {
			return '';
		}

		$allowed = array( 'noodp', 'noydir', 'noarchive', 'nosnippet', 'noimageindex' );
		$parts   = array_filter( array_map( 'trim', explode( ',', sanitize_text_field( (string) $value ) ) ) );

		return implode( ',', array_intersect( $parts, $allowed ) );
	}
}
