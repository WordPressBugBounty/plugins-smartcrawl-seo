<?php
/**
 * Template: Sitemap Sidenav.
 *
 * @package Smartcrwal
 */

namespace SmartCrawl;

$active_tab      = empty( $active_tab ) ? '' : $active_tab;
$tab_items       = array();
$override_native = empty( $override_native ) ? false : $override_native;

$tab_items[] = array(
	'id'   => 'tab_sitemap',
	'name' => $override_native
		? esc_html__( 'General Sitemap', 'smartcrawl-seo' )
		: esc_html__( 'WP Core Sitemap', 'smartcrawl-seo' ),
);
$tab_items[] = array(
	'id'   => 'tab_news',
	'name' => esc_html__( 'News Sitemap', 'smartcrawl-seo' ),
);
$tab_items[] = array(
	'id'   => 'tab_url_crawler',
	'name' => esc_html__( 'Crawler', 'smartcrawl-seo' ),
);
$tab_items[] = array(
	'id'   => 'tab_url_crawler_reporting',
	'name' => esc_html__( 'Reporting', 'smartcrawl-seo' ),
);
if ( $override_native ) {
	$tab_items[] = array(
		'id'   => 'tab_settings',
		'name' => esc_html__( 'Settings', 'smartcrawl-seo' ),
	);
}

$this->render_view(
	'vertical-tabs-side-nav',
	array(
		'active_tab' => $active_tab,
		'tabs'       => $tab_items,
	)
);
