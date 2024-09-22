<?php
$items = empty( $items ) ? array() : $items;

if ( ! $items ) {
	return;
}

$this->render_view(
	'toggle-group',
	array(
		'label'       => esc_html__( 'Indexing', 'smartcrawl-seo' ),
		'description' => esc_html__( 'Choose whether you want your website to appear in search results.', 'smartcrawl-seo' ),
		'separator'   => true,
		'items'       => $items,
	)
);
