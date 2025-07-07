<?php
/**
 * Template: Indexing Settings.
 *
 * @package Smartcrwal
 */
?>
<?php $this->render_view( 'before-page-container' ); ?>
<div id="container" class="<?php \smartcrawl_wrap_class( 'wds-page-instant-indexing' ); ?>">
	<?php
	$this->render_view(
		'page-header',
		array(
			'title'                 => esc_html__( 'Instant Indexing', 'smartcrawl-seo' ),
			'documentation_chapter' => 'instant-indexing',
			'utm_campaign'          => 'smartcrawl_instant-indexing_docs',
		)
	); ?>
	<form method='post'>
		<div class="sui-box">
			<div class="sui-box-body">
				<?php
				$this->render_view(
					'disabled-component-inner',
					array(
						'content'             => esc_html__( 'Notify search engines like Bing and Yandex via the IndexNow API whenever pages are added and updated. You can also submit URLs manually.', 'smartcrawl-seo' ),
						'component'           => 'instant_indexing',
						'upgrade_tag'         => 'smartcrawl_instant-indexing_upgrade_button',
						'premium_feature'     => true,
						'image'               => 'plugins-smartcrawl-icon.png',
						'upgrade_button_text' => esc_html__( 'Upgrade to Unlock Instant Indexing', 'smartcrawl-seo' ),
					)
				);
				?>
			</div>
		</div>
	</form>
	<?php $this->render_view( 'footer' ); ?>
</div>
