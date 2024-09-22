<?php
/**
 * Autolinking action module
 *
 * @package SmartCrawl
 */

namespace SmartCrawl\Modules\Advanced\Autolinks;

use SmartCrawl\Controllers;
use SmartCrawl\Singleton;

/**
 * Controller for Autolinks of Free version.
 */
class Controller extends Controllers\Submodule_Controller {

	use Singleton;

	/**
	 * Constructor.
	 */
	protected function __construct() {
		parent::__construct();

		$this->module_title = __( 'Automatic Links', 'smartcrawl-seo' );
		$this->premium      = true;
	}

	/**
	 * Checks if current module is active.
	 *
	 * @return bool
	 */
	public function is_active() {
		return true;
	}

	/**
	 * Initialize.
	 *
	 * @return boolean
	 */
	public function init() {
		return false;
	}

	/**
	 * Outputs submodule content to dashboard widget.
	 *
	 * @return void
	 */
	public function render_dashboard_content() {
		?>

		<div class="wds-separator-top wds-box-blocked-area wds-draw-down-md wds-draw-left">
			<small><strong><?php esc_html_e( 'Automatic Linking', 'smartcrawl-seo' ); ?></strong></small>

			<a
				href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_dash_autolinking_pro_tag"
				target="_blank"
			>
					<span
						class="sui-tag sui-tag-pro sui-tooltip"
						data-tooltip="<?php esc_attr_e( 'Upgrade to SmartCrawl Pro', 'smartcrawl-seo' ); ?>"
					>
						<?php esc_html_e( 'Pro', 'smartcrawl-seo' ); ?>
					</span>
			</a>

			<p>
				<small>
					<?php
					printf(
						/* translators: 1,2: strong tag, 3: plugin title */
						esc_html__( 'Configure %1$s%3$s%2$s to automatically link certain key words to a page on your blog or even a whole new site all together.', 'smartcrawl-seo' ),
						'<strong>',
						'</strong>',
						\smartcrawl_get_plugin_title()
					);
					?>
				</small>
			</p>
			<button
				type="button"
				data-module="<?php echo esc_attr( $this->parent->module_id ); ?>"
				data-submodule="<?php echo esc_attr( $this->module_id ); ?>"
				class="wds-activate-submodule wds-disabled-during-request sui-button sui-button-blue">

				<span class="sui-loading-text"><?php esc_html_e( 'Activate', 'smartcrawl-seo' ); ?></span>
				<span class="sui-icon-loader sui-loading" aria-hidden="true"></span>
			</button>
		</div>

		<?php
	}
}
