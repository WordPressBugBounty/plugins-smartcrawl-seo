<?php

namespace SmartCrawl\Schema;

use SmartCrawl\Singleton;
use SmartCrawl\Controllers;

class Media extends Controllers\Controller {

	use Singleton;

	const META_KEY = '_wds_post_media_schema_cache';

	/**
	 * @var bool
	 */
	private $oembed_provider = false;

	/**
	 * @var bool
	 */
	private $embed_url = false;

	/**
	 * @return void
	 */
	protected function init() {
		add_action( 'save_post', array( $this, 'handle_post_save' ) );
		add_filter( 'oembed_fetch_url', array( $this, 'intercept_embed_response' ), 10, 3 );
	}

	/**
	 * @return mixed
	 */
	public function intercept_embed_response( $provider, $url ) {
		global $post;
		if (
			is_main_query()
			&& is_singular()
			&& ! empty( $post )
			&& $this->is_supported_media( $url )
		) {
			$this->oembed_provider = $provider;
			$this->embed_url       = $url;
			add_filter( 'http_response', array( $this, 'save_intercepted_embed_response' ), 10, 3 );
		}

		return $provider;
	}

	/**
	 * @return mixed
	 */
	public function save_intercepted_embed_response( $response, $parsed_args, $provider ) {
		global $post;

		$is_expected_provider = strpos( $provider, $this->oembed_provider ) !== false;
		if ( $is_expected_provider && ! is_wp_error( $response ) && ! empty( $post->ID ) ) {

			$data = json_decode( wp_remote_retrieve_body( $response ) );

			if ( false !== $data ) {
				$cache = $this->get_cache( $post->ID );

				$media_type = $this->is_supported_audio( $this->embed_url ) ? 'audio' : 'video';
				$key        = $this->get_item_data_key( $this->embed_url );
				$data       = $this->prepare_oembed_data( $this->embed_url, $data );
				if ( $data ) {
					$cache[ $media_type ][ $key ] = $data;
				}

				$this->set_cache( $post->ID, $cache );

				$this->embed_url       = false;
				$this->oembed_provider = false;
			}
		}

		remove_filter( 'http_response', array( $this, 'save_intercepted_embed_response' ) );

		return $response;
	}

	/**
	 * @return void
	 */
	public function handle_post_save( $post_id ) {
		if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}

		$post = get_post( $post_id );
		$urls = $this->extract_supported_urls( $post->post_content );

		$previous_data = $this->get_cache( $post_id );
		$cache         = array();

		foreach ( $urls as $url ) {
			if ( $this->is_supported_audio( $url ) ) {
				$audio_data_key = $this->get_item_data_key( $url );
				$audio_data     = \smartcrawl_get_array_value( $previous_data, array( 'audio', $audio_data_key ) );
				if ( empty( $audio_data ) ) {
					$audio_data = $this->fetch_oembed_data( $url );
				}
				if ( $audio_data ) {
					$cache['audio'][ $audio_data_key ] = $audio_data;
				}
			}

			if ( $this->is_youtube_url( $url ) ) {
				$youtube_data_key = $this->get_item_data_key( $url );
				$youtube_data     = \smartcrawl_get_array_value( $previous_data, array( 'youtube', $youtube_data_key ) );
				if ( empty( $youtube_data ) ) {
					$youtube_data = \SmartCrawl\Youtube_Data_Fetcher::get_video_info( $url );
				}
				if ( $youtube_data ) {
					$cache['youtube'][ $youtube_data_key ] = $youtube_data;
				}
			}

			if ( $this->is_supported_video( $url ) ) {
				$video_data_key = $this->get_item_data_key( $url );
				$video_data     = \smartcrawl_get_array_value( $previous_data, array( 'video', $video_data_key ) );
				if ( empty( $video_data ) ) {
					$video_data = $this->fetch_oembed_data( $url );
				}
				if ( $video_data ) {
					$cache['video'][ $video_data_key ] = $video_data;
				}
			}
		}

		if ( $cache ) {
			$this->set_cache( $post_id, $cache );
		} else {
			$this->delete_cache( $post_id );
		}
	}

	public function maybe_refresh_wp_embeds_cache( $post ) {
		$supported_urls = $this->extract_supported_urls( $post->post_content );
		$cache          = $this->get_cache( $post->ID );
		if ( ! empty( $supported_urls ) && empty( $cache ) ) {
			$this->refresh_wp_embeds_cache( $post );
		}
	}

	private function refresh_wp_embeds_cache( $post ) {
		$zero_oembed_ttl = function () {
			return 0;
		};
		add_filter( 'oembed_ttl', $zero_oembed_ttl );

		global $wp_embed;
		$wp_embed->cache_oembed( $post->ID );

		remove_filter( 'oembed_ttl', $zero_oembed_ttl );
	}

	/**
	 * @return string[]
	 */
	private function extract_supported_urls( $post_content ) {
		$urls = wp_extract_urls( $post_content );

		return array_filter( $urls, array( $this, 'is_supported_media' ) );
	}

	/**
	 * @return string
	 */
	private function get_item_data_key( $url ) {
		return md5( trim( $url ) );
	}

	/**
	 * @return array|mixed
	 */
	public function get_cache( $post_id ) {
		$cache = get_post_meta( $post_id, self::META_KEY, true );

		return empty( $cache ) ? array() : $cache;
	}

	/**
	 * @return bool|int
	 */
	private function set_cache( $post_id, $value ) {
		return update_post_meta( $post_id, self::META_KEY, $value );
	}

	/**
	 * @return bool
	 */
	private function delete_cache( $post_id ) {
		return delete_post_meta( $post_id, self::META_KEY );
	}

	/**
	 * @return array
	 */
	private function fetch_oembed_data( $url ) {
		$url       = trim( $url ); // Remove white spaces if any.
		$autoembed = $this->get_oembed();
		$provider  = $autoembed->get_provider( $url );

		if ( filter_var( $provider, FILTER_VALIDATE_URL ) === false ) {
			return array();
		}

		return $this->prepare_oembed_data(
			$url,
			$autoembed->fetch( $provider, $url )
		);
	}

	/**
	 * @return array
	 */
	private function prepare_oembed_data( $url, $data ) {
		if ( ! $data ) {
			return array();
		}

		$data->url = $url;

		return (array) $data;
	}

	/**
	 * @return \WP_oEmbed
	 */
	private function get_oembed() {
		if ( ! class_exists( '\WP_oEmbed' ) ) {
			require_once ABSPATH . WPINC . '/class-oembed.php';
		}

		return new \WP_oEmbed();
	}

	/**
	 * @return bool
	 */
	private function url_has_domain( $url, $domains ) {
		$domains = join( '|', array_map( 'preg_quote', $domains ) );

		return (bool) preg_match( "~http(s)?://([^.]*.)?($domains).*~", $url );
	}

	/**
	 * @return bool
	 */
	private function is_youtube_url( $url ) {
		return $this->url_has_domain( $url, array( 'youtube.com', 'youtu.be' ) );
	}

	/**
	 * @return bool
	 */
	private function is_supported_media( $url ) {
		return $this->url_has_domain(
			$url,
			array_merge(
				$this->get_supported_video_domains(),
				$this->get_supported_audio_domains()
			)
		);
	}

	/**
	 * @return bool
	 */
	private function is_supported_video( $url ) {
		return $this->url_has_domain( $url, $this->get_supported_video_domains() );
	}

	/**
	 * @return bool
	 */
	private function is_supported_audio( $url ) {
		return $this->url_has_domain( $url, $this->get_supported_audio_domains() );
	}

	/**
	 * @return string[]
	 */
	private function get_supported_audio_domains() {
		return array(
			'soundcloud.com',
			'mixcloud.com',
			'spotify.com',
		);
	}

	/**
	 * @return string[]
	 */
	private function get_supported_video_domains() {
		return array(
			'ted.com',
			'vimeo.com',
			'dailymotion.com',
			'videopress.com',
			'vine.com',
			'youtube.com',
			'youtu.be',
		);
	}
}
