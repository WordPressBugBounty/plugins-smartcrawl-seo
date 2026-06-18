<?php
/**
 * Template: Sitemap Url Crawler Tab Title Left.
 *
 * @package Smartcrwal
 */

namespace SmartCrawl;

$upgrade_url   = 'https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_sitemap_crawler_pro_tag';
?>
<a target="_blank" href="<?php echo esc_attr( $upgrade_url ); ?>">
		<span
                class="sui-tag sui-tag-pro sui-tooltip"
                data-tooltip="<?php esc_attr_e( 'Upgrade to SmartCrawl Pro', 'smartcrawl-seo' ); ?>"
        >
			<?php esc_html_e( 'Pro', 'smartcrawl-seo' ); ?>
		</span>
</a>
