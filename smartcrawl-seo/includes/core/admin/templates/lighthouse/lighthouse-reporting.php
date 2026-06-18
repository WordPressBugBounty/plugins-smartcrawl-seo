<?php
/**
 * Template: Lighthouse Reporting.
 *
 * @package SmartCrawl
 */

$this->render_view(
        'mascot-message',
        array(
                'key'         => 'seo-checkup-upsell',
                'dismissible' => false,
                'message'     => sprintf(
                        '%s <a target="_blank" class="sui-button sui-button-purple" href="https://wpmudev.com/project/smartcrawl-wordpress-seo/?utm_source=smartcrawl&utm_medium=plugin&utm_campaign=smartcrawl_lighthouse_reporting_upsell_notice">%s</a>',
                        esc_html__( 'Upgrade to Pro to unlock automated scheduled Lighthouse reports and always stay on top of any issues.', 'smartcrawl-seo' ),
                        esc_html__( 'Unlock now with Pro', 'smartcrawl-seo' )
                ),
        )
);

