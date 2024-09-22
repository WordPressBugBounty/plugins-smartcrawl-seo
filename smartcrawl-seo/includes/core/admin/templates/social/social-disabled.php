<?php
$this->render_view(
	'disabled-component',
	array(
		'content'     => sprintf(
			'%s<br/>',
			esc_html__( 'Change how your content looks on popular social media platforms.', 'smartcrawl-seo' )
		),
		'component'   => 'social',
		'button_text' => esc_html__( 'Activate', 'smartcrawl-seo' ),
	)
);
