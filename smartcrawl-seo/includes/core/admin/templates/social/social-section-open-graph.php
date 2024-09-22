<div class="wds-separator-top">
	<?php
	$this->render_view(
		'toggle-group',
		array(
			'label'       => __( 'OpenGraph Support', 'smartcrawl-seo' ),
			'description' => __( 'This will add a few extra meta tags to the head section of your pages.', 'smartcrawl-seo' ),
			'items'       => array(
				'og-enable' => array(
					'label'       => __( 'Enable OpenGraph', 'smartcrawl-seo' ),
					'description' => __( 'By default OpenGraph will use your default titles, descriptions and feature images. You can override the default on a per post basis inside the post editor, as well as under Titles & Meta for specific post types.', 'smartcrawl-seo' ),
				),
			),
		)
	);
	?>
</div>
