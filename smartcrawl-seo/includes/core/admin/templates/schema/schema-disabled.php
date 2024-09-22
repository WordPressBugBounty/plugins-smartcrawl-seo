<?php
$this->render_view(
	'disabled-component',
	array(
		'content'      => sprintf(
			'%s<br/>',
			esc_html__( 'Quickly add Schema to your pages to help Search Engines understand and show your content better.', 'smartcrawl-seo' )
		),
		'component'    => 'schema',
		'button_text'  => esc_html__( 'Activate', 'smartcrawl-seo' ),
		'nonce_action' => 'wds-schema-nonce',
	)
);
