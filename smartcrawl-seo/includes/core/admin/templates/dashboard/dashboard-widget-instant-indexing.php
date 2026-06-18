<?php
/**
 * Template: Dashboard Instant Indexing Widget.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl;
?>
<section id="<?php echo esc_attr( \SmartCrawl\Admin\Settings\Dashboard::BOX_INSTANT_INDEXING ); ?>"
		 class="sui-box wds-dashboard-widget">
	<div class="sui-box-header">
		<h2 class="sui-box-title">
			<span class="wds-rocket-icon" aria-hidden="true"></span>
			<?php esc_html_e( 'Instant Indexing', 'smartcrawl-seo' ); ?>
		</h2>
		<span class="sui-tag sui-tag-pro sui-tooltip"
			  data-tooltip="<?php esc_html_e( 'Upgrade to SmartCrawl Pro', 'smartcrawl-seo' ); ?>">
			<?php esc_html_e( 'Pro', 'smartcrawl-seo' ); ?>
		</span>
	</div>

	<div class="sui-box-body">
		<p>
			<?php esc_html_e( 'Instantly notify search engines like Bing and Yandex whenever your site’s content changes using our IndexNow API integration.', 'smartcrawl-seo' ); ?>
		</p>
	</div>

	<div class="sui-box-footer">
		<a target="_blank" class="sui-button sui-button-purple"
		   href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_instant-indexing_dash_upsell_notice">
			<?php esc_html_e( 'Upgrade to Pro', 'smartcrawl-seo' ); ?>
		</a>
	</div>
</section>
