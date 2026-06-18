<?php
/**
 * Template: Dashboard Sitemap Widget.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl;

use SmartCrawl\Admin\Settings\Dashboard;
use SmartCrawl\Sitemaps\Utils;
use SmartCrawl\Admin\Settings\Admin_Settings;

$sitemap_available         = Admin_Settings::is_tab_allowed( Settings::TAB_SITEMAP );
$sitemap_crawler_available = Utils::crawler_available();
if ( ! $sitemap_available ) {
	return;
}

$page_url        = Admin_Settings::admin_url( Settings::TAB_SITEMAP );
$options         = $_view['options'];
$sitemap_enabled = Settings::get_setting( 'sitemap' );
$option_name     = Settings::SETTINGS_MODULE . '_options';
$override_native = Utils::override_native();
$tooltip_text    = $override_native
	? esc_html__( 'You can switch to the WordPress core sitemap through the configure button.', 'smartcrawl-seo' )
	: sprintf(
		/* translators: %s: plugin title */
		esc_html__( "You're using the default WordPress sitemap. You can switch to %s's advanced sitemaps at any time.", 'smartcrawl-seo' ),
		esc_html( \smartcrawl_get_plugin_title() )
	);
$sitemap_notice_text = \smartcrawl_format_link(
	/* translators: %s: Link to sitemap.xml */
	esc_html__( 'Your sitemap is available at %s', 'smartcrawl-seo' ),
	\smartcrawl_get_sitemap_url(),
	'/sitemap.xml',
	'_blank'
);
$core_sitemap_notice_text = \smartcrawl_format_link(
	/* translators: %s: Link to WP-Core sitemap url */
	esc_html__( 'Your WordPress core sitemap is available at %s', 'smartcrawl-seo' ),
	home_url( '/wp-sitemap.xml' ),
	'/wp-sitemap.xml',
	'_blank'
);
$news_sitemap_notice_text = \smartcrawl_format_link(
	/* translators: %s: Link to news sitemap url */
	esc_html__( 'Your news sitemap is available at %s', 'smartcrawl-seo' ),
	\smartcrawl_get_news_sitemap_url(),
	'/news-sitemap.xml',
	'_blank'
);
$news_sitemap_enabled = \smartcrawl_get_array_value( $options, 'enable-news-sitemap' );

$settings_opts = Settings::get_specific_options( $option_name );
$hide_disables = \smartcrawl_get_array_value( $settings_opts, 'hide_disables', true );

if ( ! $sitemap_enabled && $hide_disables ) {
	return '';
}
?>
<section
	id="<?php echo esc_attr( Dashboard::BOX_SITEMAP ); ?>"
	class="sui-box wds-dashboard-widget"
	data-dependent="<?php echo esc_attr( Dashboard::BOX_TOP_STATS ); ?>">

	<div class="sui-box-header">
		<h2 class="sui-box-title">
			<span class="sui-icon-web-globe-world" aria-hidden="true"></span> <?php esc_html_e( 'Sitemaps', 'smartcrawl-seo' ); ?>
		</h2>
        </div>
	<div class="sui-box-body">
		<p><?php esc_html_e( 'Automatically generate detailed sitemaps to tell search engines what content you want them to crawl and index.', 'smartcrawl-seo' ); ?></p>

		<div class="wds-separator-top wds-draw-left-padded">
			<small><strong><?php esc_html_e( 'XML Sitemap', 'smartcrawl-seo' ); ?></strong></small>
			<?php if ( $sitemap_enabled ) : ?>
				<span
					class="wds-sitemap-type-tag sui-tag sui-tooltip sui-tooltip-constrained"
					data-tooltip="<?php echo esc_attr( $tooltip_text ); ?>">
					<?php
					echo $override_native
						/* translators: 1: plugin title */
						? sprintf( esc_html__( '%s Sitemap', 'smartcrawl-seo' ), esc_html( \smartcrawl_get_plugin_title() ) )
						: esc_html__( 'WP Core Sitemap', 'smartcrawl-seo' );
					?>
				</span>

				<?php
				$this->render_view(
					'notice',
					array(
						'class'   => 'sui-notice-info',
						'message' => $override_native ? $sitemap_notice_text : $core_sitemap_notice_text,
					)
				);
				?>

			<?php else : ?>
				<p>
					<small><?php esc_html_e( 'Enables an XML page that search engines will use to crawl and index your website pages.', 'smartcrawl-seo' ); ?></small>
				</p>

				<?php
				$this->render_view(
					'dismissable-notice',
					array(
						'key'     => 'dashboard-sitemap-disabled-warning',
						'message' => __( 'Your sitemap is currently disabled. We highly recommend you enable this feature if you don’t already have a sitemap.', 'smartcrawl-seo' ),
						'class'   => 'sui-notice-warning',
					)
				);
				?>
				<button
					type="button"
					data-option-id="<?php echo esc_attr( $option_name ); ?>"
					data-flag="<?php echo 'sitemap'; ?>"
					aria-label="<?php esc_html_e( 'Activate sitemap component', 'smartcrawl-seo' ); ?>"
					class="wds-activate-component sui-button sui-button-blue wds-disabled-during-request">

					<span class="sui-loading-text"><?php esc_html_e( 'Activate', 'smartcrawl-seo' ); ?></span>
					<span class="sui-icon-loader sui-loading" aria-hidden="true"></span>
				</button>
			<?php endif; ?>
		</div>

		<?php if ( $news_sitemap_enabled ) : ?>
			<div class="wds-separator-top wds-draw-left-padded">
				<small><strong><?php esc_html_e( 'News Sitemap', 'smartcrawl-seo' ); ?></strong></small>

				<?php
				$this->render_view(
					'notice',
					array(
						'class'   => 'sui-notice-info',
						'message' => $news_sitemap_notice_text,
					)
				);
				?>
			</div>
		<?php endif; ?>

		<?php
		$this->render_view(
			'dashboard/dashboard-widget-sitemap-crawler',
			array(
				'sitemap_enabled'           => $sitemap_enabled,
				'sitemap_crawler_available' => $sitemap_crawler_available,
			)
		);
		?>
	</div>

	<div class="sui-box-footer">
		<a
			href="<?php echo esc_attr( $page_url ); ?>"
			aria-label="<?php esc_html_e( 'Configure sitemap component', 'smartcrawl-seo' ); ?>"
			class="sui-button sui-button-ghost">
			<span
				class="sui-icon-wrench-tool"
				aria-hidden="true"></span> <?php esc_html_e( 'Configure', 'smartcrawl-seo' ); ?>
		</a>
	</div>
</section>
