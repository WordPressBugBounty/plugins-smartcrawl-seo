<?php

namespace SmartCrawl\Lighthouse\Checks;

use SmartCrawl\Lighthouse\Report;
use SmartCrawl\Lighthouse\Tables\Table;

abstract class Check {

	/**
	 * @var string
	 */
	private $success_title = '';

	/**
	 * @var string
	 */
	private $failure_title = '';

	/**
	 * @var bool
	 */
	private $passed = false;

	/**
	 * @var
	 */
	private $weight;

	public function __construct() {}

	/**
	 * @return string
	 */
	public function get_title() {
		if ( $this->is_passed() ) {
			return $this->success_title;
		} else {
			return $this->failure_title;
		}
	}

	/**
	 * @param string $title
	 */
	public function set_success_title( $title ) {
		$this->success_title = $title;
	}

	/**
	 * @param string $title
	 */
	public function set_failure_title( $title ) {
		$this->failure_title = $title;
	}

	/**
	 * @return bool
	 */
	public function is_passed() {
		return $this->passed;
	}

	/**
	 * @param bool $passed
	 */
	public function set_passed( $passed ) {
		$this->passed = $passed;
	}

	/**
	 * @return mixed
	 */
	public function get_weight() {
		return $this->weight;
	}

	/**
	 * @param $weight
	 *
	 * @return void
	 */
	public function set_weight( $weight ) {
		$this->weight = $weight;
	}

	/**
	 * @param $id
	 *
	 * @return Check|null
	 */
	public static function create( $id ) {
		$available_checks = array(
			'\SmartCrawl\Lighthouse\Checks\Canonical',
			'\SmartCrawl\Lighthouse\Checks\Crawlable_Anchors',
			'\SmartCrawl\Lighthouse\Checks\Document_Title',
			'\SmartCrawl\Lighthouse\Checks\Font_Size',
			'\SmartCrawl\Lighthouse\Checks\Hreflang',
			'\SmartCrawl\Lighthouse\Checks\Http_Status_Code',
			'\SmartCrawl\Lighthouse\Checks\Image_Alt',
			'\SmartCrawl\Lighthouse\Checks\Is_Crawlable',
			'\SmartCrawl\Lighthouse\Checks\Link_Text',
			'\SmartCrawl\Lighthouse\Checks\Meta_Description',
			'\SmartCrawl\Lighthouse\Checks\Plugins',
			'\SmartCrawl\Lighthouse\Checks\Robots_Txt',
			'\SmartCrawl\Lighthouse\Checks\Tap_Targets',
			'\SmartCrawl\Lighthouse\Checks\Viewport',
			'\SmartCrawl\Lighthouse\Checks\Structured_Data',
		);

		foreach ( $available_checks as $check ) {
			if ( constant( "{$check}::ID" ) === $id ) {
				return new $check();
			}
		}

		return null;
	}

	/**
	 * @param $value
	 *
	 * @return string
	 */
	public function tag( $value ) {
		return '<span class="wds-lh-tag">' . esc_html( $value ) . '</span>';
	}

	/**
	 * @param $value
	 *
	 * @return string
	 */
	public function attr( $value ) {
		return '<span class="wds-lh-attr">' . esc_html( $value ) . '</span>';
	}

	/**
	 * @return mixed
	 */
	abstract function get_id();

	/**
	 * @return mixed
	 */
	abstract public function prepare();
}
