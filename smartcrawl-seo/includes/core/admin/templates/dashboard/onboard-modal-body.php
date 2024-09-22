<?php

namespace SmartCrawl;

use SmartCrawl\Admin\Settings\Admin_Settings;
use SmartCrawl\Modules\Advanced\Robots\Controller as Robots_Controller;
use SmartCrawl\Readability\Controller as Redability_Controller;
use SmartCrawl\Services\Service;

$sitemap_available  = Admin_Settings::is_tab_allowed( Settings::TAB_SITEMAP );
$social_available   = Admin_Settings::is_tab_allowed( Settings::TAB_SOCIAL );
$service            = Service::get( Service::SERVICE_SITE );
$robots_file_exists = Robots_Controller::get()->file_exists();
// Check if current language is supported for readability analysis.
$lang_supported = Redability_Controller::get()->is_language_supported();
// Usage tracking.
$usage_tracking = Settings::get_value( 'usage_tracking', Settings::get_options() );
?>

<div class="wds-separator-top">
	<?php
	$this->render_view(
		'toggle-item',
		array(
			'field_name'       => 'analysis-enable',
			'item_label'       => esc_html__( 'SEO & Readability Analysis', 'smartcrawl-seo' ),
			'item_description' => esc_html__( 'Have your pages and posts analyzed for SEO and readability improvements to improve your search ranking', 'smartcrawl-seo' ),
			'checked'          => true,
			'attributes'       => array(
				'data-processing' => esc_attr__( 'Activating SEO & Readability Analysis', 'smartcrawl-seo' ),
			),
		)
	);
	if ( ! $lang_supported ) {
		$this->render_view(
			'notice',
			array(
				'class'   => 'sui-notice-yellow',
				'message' => sprintf(
				// translators: %s link to documentation.
					__( 'This feature may not work as expected as our SEO analysis engine doesn\'t support your current site language. For better results, change the language in WordPress settings to one of the <a href="%s" target="_blank">supported languages</a>.', 'smartcrawl-seo' ),
					'https://wpmudev.com/docs/wpmu-dev-plugins/smartcrawl/#in-post-analysis'
				),
			)
		);
	}
	?>
</div>

<?php if ( $sitemap_available ) : ?>
	<div class="wds-separator-top">
		<?php
		$this->render_view(
			'toggle-item',
			array(
				'field_name'       => 'sitemaps-enable',
				'item_label'       => esc_html__( 'Sitemaps', 'smartcrawl-seo' ),
				'item_description' => esc_html__( 'Sitemaps expose your site content to search engines and allow them to discover it more easily.', 'smartcrawl-seo' ),
				'checked'          => true,
				'attributes'       => array(
					'data-processing' => esc_attr__( 'Activating Sitemaps', 'smartcrawl-seo' ),
				),
			)
		);
		?>
	</div>
<?php endif; ?>

<div class="wds-separator-top">
	<?php
	$robots_attributes = array(
		'data-processing' => esc_attr__( 'Activating Robots.txt file', 'smartcrawl-seo' ),
	);
	if ( $robots_file_exists ) {
		$robots_attributes['disabled'] = 'disabled';
	}
	$this->render_view(
		'toggle-item',
		array(
			'field_name'       => 'robots-txt-enable',
			'item_label'       => esc_html__( 'Robots.txt File', 'smartcrawl-seo' ),
			'item_description' => esc_html__( 'All sites are recommended to have a robots.txt file that instructs search engines what they can and can’t crawl. We will create a default robots.txt file which you can customize later.', 'smartcrawl-seo' ),
			'checked'          => ! $robots_file_exists,
			'attributes'       => $robots_attributes,
		)
	);
	if ( $robots_file_exists ) {
		$this->render_view(
			'notice',
			array(
				'message' => \smartcrawl_format_link(
				// translators: %s link to robots.txt file.
					esc_html__( "We've detected an existing %s file that we are unable to edit. You will need to remove it before you can enable this feature.", 'smartcrawl-seo' ),
					\smartcrawl_get_robots_url(),
					'robots.txt',
					'_blank'
				),
			)
		);
	}
	?>
</div>

<?php if ( $social_available ) : ?>
	<div class="wds-separator-top">
		<?php
		$this->render_view(
			'toggle-item',
			array(
				'field_name'       => 'opengraph-twitter-enable',
				'item_label'       => esc_html__( 'OpenGraph & Twitter Cards', 'smartcrawl-seo' ),
				'item_description' => esc_html__( 'Enhance how your posts and pages look when shared on Twitter and Facebook by adding extra meta tags to your page output.', 'smartcrawl-seo' ),
				'checked'          => true,
				'attributes'       => array(
					'data-processing' => esc_attr__( 'Activating OpenGraph & Twitter Cards', 'smartcrawl-seo' ),
				),
			)
		);
		?>
	</div>
<?php endif; ?>

<?php if ( \smartcrawl_is_tracking_allowed() ) : ?>

	<div class="wds-separator-top">
		<?php
		$show_doc_link = \smartcrawl_is_doc_link_enabled();

		$this->render_view(
			'toggle-item',
			array(
				'field_name'       => 'usage-tracking-enable',
				'checked'          => $usage_tracking,
				'html_label'       => sprintf(
					/* translators: 1, 2: opening/closing span tags */
					__( 'Share Anonymous Usage Data %1$sRecommended%2$s', 'smartcrawl-seo' ),
					'<span class="sui-tag sui-tag-sm">',
					'</span>'
				),
				'html_description' => $show_doc_link ?
					sprintf(
						/* translators: 1,2: strong tag, 3: plugin title, 4,5: anchor tag */
						esc_html__( 'Help us improve %1$s%3$s%2$s, and prevent errors by sharing anonymous and non-sensitive usage data. You can change this option in the settings. See %4$smore info%5$s about the data we collect.', 'smartcrawl-seo' ),
						'<strong>',
						'</strong>',
						\smartcrawl_get_plugin_title(),
						'<a href="https://wpmudev.com/docs/privacy/our-plugins/#usage-tracking-sc" target="_blank">',
						'</a>'
					)
					: sprintf(
						/* translators: 1,2: strong tag, 3: plugin title */
						esc_html__( 'Help us improve %1$s%3$s%2$s, by sharing anonymous, and non-sensitive usage data.', 'smartcrawl-seo' ),
						'<strong>',
						'</strong>',
						esc_html( \smartcrawl_get_plugin_title() )
					),
				'attributes'       => array(
					'data-processing' => esc_attr__( 'Activating Usage Tracking', 'smartcrawl-seo' ),
				),
			)
		);
		?>
	</div>

	<?php
endif;