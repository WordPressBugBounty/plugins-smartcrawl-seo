<?php

namespace SmartCrawl\Schema\Fragments;

use SmartCrawl\Models\User;
use SmartCrawl\Schema\Utils;

class Publisher extends Fragment {
	/**
	 * @var
	 */
	private $full_output;
	/**
	 * @var Utils
	 */
	private $utils;
	/**
	 * @var User
	 */
	private $owner;

	/**
	 * @param $full_output
	 */
	public function __construct( $full_output ) {
		$this->full_output = $full_output;
		$this->utils       = new Utils();
		$this->owner       = User::owner();
	}

	/**
	 * @return mixed|string
	 */
	private function get_publisher_type() {
		if ( $this->utils->is_schema_type_person() ) {
			return 'Organization';
		} else {
			return $this->full_output
				? $this->get_organization_type_option() // Only use the specific org type If we're showing the full output.
				: 'Organization';  // Otherwise use Organization.
		}
	}

	/**
	 * @return array|mixed|void
	 */
	protected function get_raw() {
		return $this->get_publisher_schema();
	}

	/**
	 * @return string
	 */
	public function get_publisher_id() {
		if ( $this->utils->is_schema_type_person() ) {
			return $this->get_personal_brand_id();
		} else {
			return $this->get_publishing_organization_id();
		}
	}

	/**
	 * @return array|mixed|void
	 */
	protected function get_publisher_schema() {
		if ( $this->utils->is_schema_type_person() ) {
			return $this->get_personal_brand_schema();
		} else {
			return $this->get_publishing_organization_schema( $this->full_output );
		}
	}

	/**
	 * @return array
	 */
	private function get_personal_brand_schema() {
		// Summary.
		$schema = array(
			'@type' => 'Organization',
			'@id'   => $this->get_personal_brand_id(),
			'url'   => $this->get_publisher_url(),
		);

		// Name.
		$schema['name'] = $this->utils->get_personal_brand_name();

		// Logo.
		$site_url = get_site_url();
		$logo     = $this->utils->get_media_item_image_schema(
			(int) $this->utils->get_schema_option( 'person_brand_logo' ),
			$this->utils->url_to_id( $site_url, '#schema-personal-brand-logo' )
		);
		if ( $logo ) {
			$schema['logo'] = $logo;
		}

		return $schema;
	}

	/**
	 * @param $full
	 *
	 * @return mixed|void
	 */
	private function get_publishing_organization_schema( $full ) {
		// Summary.
		$organization_type = $this->get_publisher_type();

		$schema = array(
			'@type' => $organization_type,
			'@id'   => $this->get_publishing_organization_id(),
			'url'   => $this->get_publisher_url(),
		);

		// Name.
		$schema['name'] = $this->utils->get_organization_name();

		// Logo.
		$org_logo = $this->get_organization_logo();
		if ( $org_logo ) {
			$schema['logo'] = $org_logo;

			if ( $full ) {
				$schema['image'] = $org_logo;
			}
		}

		if ( ! $full ) {
			return $this->filter_owner_data( $schema );
		}

		// Description.
		$schema['description'] = $this->utils->get_organization_description();

		// Contact point.
		$contact_point = $this->utils->get_contact_point(
			$this->utils->get_schema_option( 'organization_phone_number' ),
			(int) $this->utils->get_schema_option( 'organization_contact_page' ),
			$this->utils->get_schema_option( 'organization_contact_type' )
		);
		if ( $contact_point ) {
			$schema['contactPoint'] = $contact_point;
		}

		// Social URLs.
		$social_urls = $this->utils->get_social_urls();
		if ( $social_urls ) {
			$schema['sameAs'] = $social_urls;
		}

		return $this->filter_owner_data( $schema );
	}

	/**
	 * @param $data
	 *
	 * @return mixed|void
	 */
	private function filter_owner_data( $data ) {
		return $this->utils->apply_filters( 'owner-data', $data );
	}

	/**
	 * @return array|mixed|void
	 */
	private function get_organization_logo() {
		$url = $this->utils->get_social_option( 'organization_logo' );
		if ( empty( $url ) ) {
			return array();
		}

		$schema = $this->utils->get_image_schema(
			$this->utils->url_to_id( get_site_url(), '#schema-organization-logo' ),
			esc_url( $url ),
			60,
			60
		);

		return $this->utils->apply_filters( 'site-logo', $schema );
	}

	/**
	 * @return mixed|string
	 */
	private function get_organization_type_option() {
		$org_type = $this->utils->get_schema_option( 'organization_type' );

		// Since version 2.10 LocalBusiness is not supported as organization_type.
		// Instead, the users are encouraged to use the LocalBusiness type in the schema builder.
		if ( 'LocalBusiness' === $org_type ) {
			$org_type = '';
		}

		return $org_type
			? $org_type
			: 'Organization';
	}

	/**
	 * @return string
	 */
	private function get_publishing_organization_id() {
		return $this->utils->url_to_id( $this->get_publisher_url(), '#schema-publishing-organization' );
	}

	/**
	 * @return string
	 */
	private function get_personal_brand_id() {
		return $this->utils->url_to_id( $this->get_publisher_url(), '#schema-personal-brand' );
	}

	/**
	 * @return false|string|\WP_Error
	 */
	public function get_publisher_url() {
		$output_page = $this->utils->get_special_page( 'schema_output_page' );

		return $output_page
			? get_permalink( $output_page )
			: get_site_url();
	}
}
