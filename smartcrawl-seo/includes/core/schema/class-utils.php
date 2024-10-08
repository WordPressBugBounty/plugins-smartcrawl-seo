<?php

namespace SmartCrawl\Schema;

use SmartCrawl\Settings;
use SmartCrawl\Singleton;

class Utils {

	use Singleton;

	/**
	 * @var array
	 */
	private $social_options;

	/**
	 * @var array
	 */
	private $schema_options;

	/**
	 * @return string
	 */
	public function url_to_id( $url, $id ) {
		/**
		 * Rewrite.
		 *
		 * @var $wp_rewrite \WP_Rewrite
		 */
		global $wp_rewrite;
		if ( $wp_rewrite->using_permalinks() ) {
			$url = trailingslashit( $url );
		}

		return $url . $id;
	}

	/**
	 * @return mixed|string|null
	 */
	public function get_schema_option( $key ) {
		$value = \smartcrawl_get_array_value( $this->get_schema_options(), $key );
		if ( is_string( $value ) ) {
			return sanitize_text_field( trim( $value ) );
		}

		return $value;
	}

	/**
	 * @return array
	 */
	private function get_schema_options() {
		if ( empty( $this->schema_options ) ) {
			$schema               = Settings::get_component_options( Settings::COMP_SCHEMA );
			$this->schema_options = is_array( $schema ) ? $schema : array();
		}

		return $this->schema_options;
	}

	/**
	 * @return array
	 */
	public function get_social_options() {
		if ( empty( $this->social_options ) ) {
			$social               = Settings::get_component_options( Settings::COMP_SOCIAL );
			$this->social_options = is_array( $social ) ? $social : array();
		}

		return $this->social_options;
	}

	/**
	 * @return mixed|string|null
	 */
	public function get_social_option( $key ) {
		$value = \smartcrawl_get_array_value( $this->get_social_options(), $key );
		if ( is_string( $value ) ) {
			return sanitize_text_field( trim( $value ) );
		}

		return $value;
	}

	/**
	 * @return array
	 */
	public function get_media_item_image_schema( $media_item_id, $schema_id ) {
		if ( ! $media_item_id ) {
			return array();
		}

		$media_item = $this->get_attachment_image_source( $media_item_id );
		if ( ! $media_item ) {
			return array();
		}

		return $this->get_image_schema(
			$schema_id,
			$media_item[0],
			$media_item[1],
			$media_item[2],
			wp_get_attachment_caption( $media_item_id )
		);
	}

	/**
	 * @return array|false
	 */
	public function get_attachment_image_source( $media_item_id ) {
		$media_item = wp_get_attachment_image_src( $media_item_id, 'full' );
		if ( ! $media_item || count( $media_item ) < 3 ) {
			return false;
		}

		return $media_item;
	}

	/**
	 * @return array
	 */
	public function get_image_schema( $id, $url, $width = '', $height = '', $caption = '' ) {
		$image_schema = array(
			'@type' => 'ImageObject',
			'@id'   => $id,
			'url'   => $url,
		);

		if ( $height ) {
			$image_schema['height'] = $height;
		}

		if ( $width ) {
			$image_schema['width'] = $width;
		}

		if ( $caption ) {
			$image_schema['caption'] = $caption;
		}

		return $image_schema;
	}

	/**
	 * @return mixed|void
	 */
	public function apply_filters( $filter, ...$args ) {
		return apply_filters( "wds-schema-$filter", ...$args );
	}

	/**
	 * @return void
	 */
	public function reset_options() {
		$this->schema_options = array();
		$this->social_options = array();
	}

	/**
	 * @return string
	 */
	public function get_webpage_id( $url ) {
		return $this->url_to_id( $url, '#schema-webpage' );
	}

	/**
	 * @return string
	 */
	public function get_website_id() {
		return $this->url_to_id( get_site_url(), '#schema-website' );
	}

	/**
	 * @return array
	 */
	public function get_custom_schema_types( $post = null, $is_front_page = false ) {
		$custom_types = array();
		$schema_types = \SmartCrawl\Schema\Types::get()->get_schema_types();
		foreach ( $schema_types as $schema_type ) {
			$type = \SmartCrawl\Schema\Types\Type::create( $schema_type, $post, $is_front_page );

			if ( $type->is_active() && $type->conditions_met() ) {
				$custom_types[ $type->get_type() ][] = $type->get_schema();
			}
		}

		return $custom_types;
	}

	/**
	 * TODO: make sure webpage_id is passed where necessary
	 *
	 * @return mixed
	 */
	public function add_custom_schema_types( $schema, $custom_types, $webpage_id ) {
		foreach ( $custom_types as $type_key => $type_collection ) {
			if ( 'Article' === $type_key ) {
				// Article schemas will be handled separately.
				continue;
			}

			foreach ( $type_collection as $custom_type ) {
				$schema[] = $custom_type;
			}
		}

		$article_schemas = \smartcrawl_get_array_value( $custom_types, 'Article' );
		if ( ! empty( $article_schemas ) && is_array( $article_schemas ) ) {
			foreach ( $article_schemas as $article_schema ) {
				$article_schema['mainEntityOfPage'] = $webpage_id;

				$schema[] = $article_schema;
			}
		}

		return $schema;
	}

	/**
	 * @return bool
	 */
	public function is_schema_type_person() {
		return $this->get_social_option( 'schema_type' ) === 'Person';
	}

	/**
	 * @return array|false|\WP_Post
	 */
	public function get_special_page( $key ) {
		$page_id = (int) $this->get_schema_option( $key );
		if ( ! $page_id ) {
			return false;
		}

		$special_page = get_post( $page_id );
		if ( ! $special_page || is_wp_error( $special_page ) ) {
			return false;
		}

		return $special_page;
	}

	/**
	 * @return mixed
	 */
	public function get_user_full_name( $user ) {
		return $this->apply_filters( 'user-full_name', $user->get_full_name(), $user );
	}

	/**
	 * @return mixed|string|void
	 */
	public function get_organization_name() {
		$organization_name = $this->get_social_option( 'organization_name' );

		return $organization_name
			? $organization_name
			: get_bloginfo( 'name' );
	}

	/**
	 * @return mixed|string
	 */
	public function get_personal_brand_name() {
		return $this->first_non_empty_string(
			$this->get_schema_option( 'person_brand_name' ),
			$this->get_social_option( 'override_name' ),
			$this->get_user_full_name( \SmartCrawl\Models\User::owner() )
		);
	}

	/**
	 * @return mixed|string
	 */
	public function first_non_empty_string( ...$args ) {
		foreach ( $args as $arg ) {
			if ( ! empty( $arg ) ) {
				return $arg;
			}
		}

		return '';
	}

	/**
	 * @return mixed|string|void
	 */
	public function get_organization_description() {
		$description = $this->get_textarea_schema_option( 'organization_description' );

		return $description ? $description : get_bloginfo( 'description' );
	}

	/**
	 * @return mixed|string|null
	 */
	public function get_textarea_schema_option( $key ) {
		$value = $this->get_schema_option( $key );
		if ( is_string( $value ) ) {
			return sanitize_textarea_field( trim( $value ) );
		}

		return $value;
	}

	/**
	 * @return bool
	 */
	public function is_author_gravatar_enabled() {
		return (bool) $this->get_schema_option( 'schema_enable_author_gravatar' );
	}

	/**
	 * @return array|string[]
	 */
	public function get_contact_point( $phone, $contact_page_id, $contact_type = '' ) {
		$schema = array();
		if ( $phone ) {
			$schema['telephone'] = $phone;
		}

		if ( $contact_page_id ) {
			$contact_page_url = get_permalink( $contact_page_id );
			if ( $contact_page_url ) {
				$schema['url'] = $contact_page_url;
			}
		}

		if ( $schema ) {
			$other_values = array( '@type' => 'ContactPoint' );
			if ( $contact_type ) {
				$other_values['contactType'] = $contact_type;
			}
			$schema = $other_values + $schema;
		}

		return $schema;
	}

	/**
	 * @return array
	 */
	public function get_social_urls() {
		$urls   = array();
		$social = $this->get_social_options();
		foreach ( $social as $key => $value ) {
			if ( preg_match( '/_url$/', $key ) && ! empty( trim( $value ) ) ) {
				$urls[] = $this->get_social_option( $key );
			}
		}

		$twitter_username = $this->get_social_option( 'twitter_username' );
		if ( $twitter_username ) {
			$urls[] = "https://twitter.com/$twitter_username";
		}

		return $urls;
	}

	/**
	 * Get current url.
	 *
	 * @since 3.5.0
	 *
	 * @return string
	 */
	public function get_current_url() {
		global $wp;

		return add_query_arg( $wp->query_vars, home_url( $wp->request ) );
	}
}
