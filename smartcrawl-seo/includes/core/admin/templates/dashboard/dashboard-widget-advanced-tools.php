<?php
/**
 * Template: Dashboard Advanced Tools Widget.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl;

use SmartCrawl\Admin\Settings\Admin_Settings;
use SmartCrawl\Admin\Settings\Dashboard;
use SmartCrawl\Modules\Advanced\Robots\Controller;

if ( ! Admin_Settings::is_tab_allowed( Settings::ADVANCED_MODULE ) ) {
	return;
}

$is_active = \SmartCrawl\Modules\Advanced\Controller::get()->should_run();

$settings_opts = Settings::get_specific_options( Settings::SETTINGS_MODULE . '_options' );

if ( ! $is_active && \smartcrawl_get_array_value( $settings_opts, 'hide_disables', true ) ) {
	return '';
}

$page_url = Admin_Settings::admin_url( Settings::ADVANCED_MODULE );
?>

<section
	id="<?php echo esc_attr( Dashboard::BOX_ADVANCED_TOOLS ); ?>"
	class="sui-box wds-dashboard-widget"
>
	<div class="sui-box-header">
		<h2 class="sui-box-title">
			<span class="sui-icon-wand-magic" aria-hidden="true"></span> <?php esc_html_e( 'Advanced Tools', 'smartcrawl-seo' ); ?>
		</h2>
	</div>

	<div class="sui-box-body">
		<p><?php esc_html_e( 'Advanced tools focus on the finer details of SEO including internal linking, redirections and Moz analysis.', 'smartcrawl-seo' ); ?></p>

		<?php if ( $is_active ) : ?>

			<?php do_action( 'smartcrawl_widget_advanced_submodules' ); ?>

		<?php endif; ?>

	</div>

	<div class="sui-box-footer">
		<?php if ( $is_active ) : ?>
			<a
				href="<?php echo esc_attr( $page_url ); ?>"
				aria-label="<?php esc_html_e( 'Configure advanced tools', 'smartcrawl-seo' ); ?>"
				class="sui-button sui-button-ghost"
			>
				<span
					class="sui-icon-wrench-tool"
					aria-hidden="true"></span> <?php esc_html_e( 'Configure', 'smartcrawl-seo' ); ?>
			</a>
		<?php else : ?>
			<button
				type="button"
				data-module="advanced"
				data-value="0"
				class="wds-activate-module wds-disabled-during-request sui-button sui-button-blue">
				<span class="sui-loading-text"><?php esc_html_e( 'Activate', 'smartcrawl-seo' ); ?></span>
				<span class="sui-icon-loader sui-loading" aria-hidden="true"></span>
			</button>
		<?php endif; ?>
	</div>
	<?php $this->render_view( 'dashboard/dashboard-widget-advanced-tools-upsell' ); ?>
</section>
