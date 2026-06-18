<?php
/**
 * Template: Dashboard Advanced Tools Upsell.
 *
 * @package SmartCrawl
 */

namespace SmartCrawl;

?>

<div class="sui-box-body">
	<?php
	$this->render_view(
		'mascot-message',
		array(
			'key'         => 'seo-checkup-upsell',
			'dismissible' => false,
			'message'     => sprintf(
				'%s <a target="_blank" class="sui-button sui-button-purple" href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_dash_reports_upsell_notice">%s</a>',
				esc_html__( 'Upgrade to Pro and automatically link your articles both internally and externally with automatic linking - a favourite among SEO pros.', 'smartcrawl-seo' ),
				esc_html__( 'Unlock now with Pro', 'smartcrawl-seo' )
			),
		)
	);
	?>
</div>
