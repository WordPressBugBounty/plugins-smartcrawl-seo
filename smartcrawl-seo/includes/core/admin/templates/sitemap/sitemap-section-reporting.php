<?php
/**
 * Template: Sitemap Reporting section.
 *
 * @package Smartcrwal
 */

$this->render_view(
        'mascot-message',
        array(
                'key'         => 'seo-checkup-upsell',
                'dismissible' => false,
                'message'     => sprintf(
                        '%s <a target="_blank" class="sui-button sui-button-purple" href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_sitemap_reporting_upsell_notice">%s</a>',
                        esc_html__( 'Unlock automated crawls of your URLs to always stay on top of any issues with SmartCrawl Pro. Get Sitemap Reports as part of a WPMU DEV membership along with other pro plugins and services, 24/7 support and much more', 'smartcrawl-seo' ),
                        esc_html__( 'Unlock now with Pro', 'smartcrawl-seo' )
                ),
        )
);