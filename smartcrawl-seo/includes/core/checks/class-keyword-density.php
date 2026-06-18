<?php
/**
 * Keyword density check.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Checks;

use SmartCrawl\Cache\String_Cache;
use SmartCrawl\Html;
use SmartCrawl\String_Utils;

/**
 * Class Smartcrawl_Check_Keyword_Density
 */
class Keyword_Density extends Check {

	/**
	 * Holds check state
	 *
	 * @var bool
	 */
	private $state;

	/**
	 * Exact keyphrase match count (Phase 2).
	 *
	 * @var int
	 */
	private $exact_count = 0;

	/**
	 * Holds keyword density value.
	 *
	 * @var null|float
	 */
	private $density = null;

	/**
	 * Whether keyphrase was found via loose match but not an exact.
	 *
	 * @var bool
	 */
	private $loose_not_exact = false;

	/**
	 * Holds stopwords for the current language.
	 *
	 * @var array
	 */
	private $stopwords = array();


	/**
	 * Retrieves the message for the check.
	 *
	 * @return string
	 */
	public function get_status_msg() {
		if ( $this->loose_not_exact ) {
			return __( 'Found, but not used exactly. Consider using the full phrase', 'smartcrawl-seo' );
		}

		return $this->choose_status_message(
			__( "You haven't used any keyphrases yet", 'smartcrawl-seo' ),
			// translators: %d low, %d high.
			__( 'Your %4$s density is between %1$d%% and %2$d%%', 'smartcrawl-seo' ),
			// translators: %d low.
			__( 'Your %4$s density is less than %1$d%%', 'smartcrawl-seo' ),
			// translators: %d high.
			__( 'Your %4$s density is greater than %2$d%%', 'smartcrawl-seo' )
		);
	}

	/**
	 * Select status message based on density.
	 *
	 * @param string $no_keywords     No keywords message.
	 * @param string $correct_density Correct density keyword.
	 * @param string $low_density     Low density keyword.
	 * @param string $high_density    High density keyword.
	 *
	 * @return string
	 */
	private function choose_status_message( $no_keywords, $correct_density, $low_density, $high_density ) {
		$keyword_density = $this->density ? round( $this->density, 2 ) : 0;

		if ( 0 === $this->exact_count ) {
			$message = $no_keywords;
		} elseif ( $this->state ) {
			$message = $correct_density;
		} elseif ( $keyword_density < $this->get_min() ) {
				$message = $low_density;
		} else {
			$message = $high_density;
		}

		return sprintf( $message, $this->get_min(), $this->get_max(), $keyword_density, $this->get_keyword_label() );
	}

	/**
	 * Retrieves minimum recommended density.
	 *
	 * @return int
	 */
	public function get_min() {
		return 1;
	}

	/**
	 * Retrieves maximum recommended density.
	 *
	 * @return int
	 */
	public function get_max() {
		return 3;
	}

	/**
	 * Applies check to the subject.
	 *
	 * @return bool
	 */
	public function apply() {
		$markup = $this->get_markup();
		if ( empty( $markup ) ) {
			$this->state           = false;
			$this->loose_not_exact = false;
			$this->exact_count     = 0;

			return false;
		}

		$kws = $this->get_focus();
		if ( empty( $kws ) ) {
			$this->state           = true;
			$this->density         = null;
			$this->loose_not_exact = false;
			$this->exact_count     = 0;

			return true; // Can't determine kw density.
		}

		$text = Html::plaintext( $markup );

		// Full keyphrase string (including stop words) for Phase 2 exact matching.
		$raw_focus       = $this->get_raw_focus();
		$keyphrase_full  = ! empty( $raw_focus ) ? implode( ' ', $raw_focus ) : implode( ' ', $kws );

		if ( empty( $this->stopwords ) ) {
			$string          = String_Cache::get()->get_string( $text, $this->get_language() );
			$this->stopwords = $string->get_language_stopwords();
		}

		// Phase 1 (loose): Is keyphrase present when stop words and punctuation are ignored?
		$loose_found = String_Utils::has_keyphrase_loose( $text, $keyphrase_full, $this->stopwords );

		// Phase 2 (exact): Count exact phrase (including stop words) in punctuation-normalized content. Density only from exact matches.
		$exact_content     = String_Utils::normalize_punctuation_only( $text );
		$exact_keyphrase   = String_Utils::normalize_punctuation_only( $keyphrase_full );
		$total_words       = str_word_count( $exact_content );
		$exact_count       = '' !== $exact_keyphrase ? substr_count( $exact_content, $exact_keyphrase ) : 0;
		$this->exact_count = $exact_count;

		$this->loose_not_exact = $loose_found && ( 0 === $exact_count );

		if ( 0 === $exact_count ) {
			$this->density = 0;
			// State: fail if we have no exact matches. If loose found, frontend will show "Found, but not used exactly".
			$this->state = false;
		} else {
			$this->density = $total_words > 0 ? ( $exact_count / $total_words ) * 100 : 0;
			$this->state   = $this->density >= $this->get_min() && $this->density <= $this->get_max();
		}

		return $this->state;
	}

	/**
	 * Retrieves check result.
	 *
	 * @return array
	 */
	public function get_result() {
		$density = null !== $this->density ? round( $this->density, 2 ) : 0;

		return array(
			'state'           => $this->state,
			'density'         => $density,
			'exact_count'     => $this->exact_count,
			'min'             => $this->get_min(),
			'max'             => $this->get_max(),
			'type'            => $this->get_keyword_label(),
			'loose_not_exact' => $this->loose_not_exact,
		);
	}
}
