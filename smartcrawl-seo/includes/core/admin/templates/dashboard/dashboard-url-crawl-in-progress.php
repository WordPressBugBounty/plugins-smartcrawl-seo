<?php
$progress = empty( $progress ) ? 0 : $progress;
?>
<div class="wds-box-refresh-required"></div>
<p>
	<small>
		<?php
		printf(
			/* translators: 1,2: strong tag, 3: plugin title */
			esc_html__( '%1$s%3$s%2$s is performing a URL Crawl. Please wait...', 'smartcrawl-seo' ),
			'<strong>',
			'</strong>',
			esc_html( \smartcrawl_get_plugin_title() )
		);
		?>
	</small>
</p>

<?php
$this->render_view(
	'progress-bar',
	array(
		'progress'       => $progress,
		'progress_state' => esc_html__( 'Crawl in progress...', 'smartcrawl-seo' ),
	)
);

$this->render_view(
	'progress-notice',
	array(
		'message' => sprintf(
				/* translators: 1,2: strong tag, 3: plugin title */
			__( 'You can always come back later. %1$s%3$s%2$s will send you an email to %4$s with the results of the crawl.', 'smartcrawl-seo' ),
			'<strong>',
			'</strong>',
			\smartcrawl_get_plugin_title(),
			\smartcrawl_get_admin_email(),
		),
	)
);
?>
