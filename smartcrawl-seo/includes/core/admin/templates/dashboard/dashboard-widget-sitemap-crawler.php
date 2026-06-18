<?php
/**
 * Template: Dashboard Sitemap Widget Crawler.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl;

$sitemap_crawler_available = ! empty( $sitemap_crawler_available );

if ( ! $sitemap_crawler_available ) {
	return;
}
?>

<div class="wds-separator-top cf wds-box-blocked-area wds-draw-down wds-draw-left">
	<small><strong><?php esc_html_e( 'URL Crawler', 'smartcrawl-seo' ); ?></strong></small>
	<a
		href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_dash_crawl_pro_tag"
		target="_blank">
		<span
			class="sui-tag sui-tag-pro sui-tooltip"
			data-tooltip="<?php esc_attr_e( 'Upgrade to SmartCrawl Pro', 'smartcrawl-seo' ); ?>">
			<?php esc_html_e( 'Pro', 'smartcrawl-seo' ); ?>
		</span>
	</a>
	<p>
		<small>
			<?php
			printf(
				/* translators: 1,2: strong tag, 3: plugin title */
				esc_html__( 'Automatically schedule %1$s%3$s%2$s to run check for URLs that are missing from your Sitemap.', 'smartcrawl-seo' ),
				'<strong>',
				'</strong>',
				esc_html( \smartcrawl_get_plugin_title() )
			);
			?>
		</small>
	</p>
</div>
