<?php
/**
 * Document_Title class for checking the presence of a <title> element in the document.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Lighthouse\Checks;

/**
 * Document_Title class.
 *
 * Checks if the document has a <title> element.
 */
class Document_Title extends Check {
	const ID = 'document-title';

	/**
	 * Prepares the check by setting success and failure titles.
	 *
	 * @return void
	 */
	public function prepare() {
		$this->set_success_title( esc_html__( 'Document has a <title> element', 'smartcrawl-seo' ) );
		$this->set_failure_title( esc_html__( "Document doesn't have a <title> element", 'smartcrawl-seo' ) );
	}

	/**
	 * Gets the ID of the check.
	 *
	 * @return string
	 */
	public function get_id() {
		return self::ID;
	}
}
