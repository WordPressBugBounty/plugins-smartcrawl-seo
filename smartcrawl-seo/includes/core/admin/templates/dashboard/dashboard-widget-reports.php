<?php
/**
 * Template: Dashboard Reports Widget.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl;

$health_available  = is_main_site();
$crawler_available = \SmartCrawl\Sitemaps\Utils::crawler_available();
if ( ! $health_available && ! $crawler_available ) {
	return;
}

$this->render_view( 'dashboard/dashboard-reports-upsell' );
