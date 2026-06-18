<?php
/**
 * Dashboard Welcome Modal.
 *
 * @package SmartCrawl
 */

$modal_id = 'wds-welcome-modal';
?>

<div class="sui-modal sui-modal-md">
	<div
		role="dialog"
		id="<?php echo esc_attr( $modal_id ); ?>"
		class="sui-modal-content <?php echo esc_attr( $modal_id ); ?>-dialog"
		aria-modal="true"
		aria-labelledby="<?php echo esc_attr( $modal_id ); ?>-dialog-title"
		aria-describedby="<?php echo esc_attr( $modal_id ); ?>-dialog-description">

		<div class="sui-box" role="document">
			<div class="sui-box-header sui-flatten sui-content-center sui-spacing-top--40">
				<div class="sui-box-banner" role="banner" aria-hidden="true">
					<img
						src="<?php echo esc_attr( SMARTCRAWL_PLUGIN_URL ); ?>assets/images/sidebar-welcome-header.svg"
						alt="<?php esc_attr_e( 'SmartCrawl editor sidebar', 'smartcrawl-seo' ); ?>"
					/>
				</div>
				<button
					class="sui-button-icon sui-button-float--right" data-modal-close
					id="<?php echo esc_attr( $modal_id ); ?>-close-button"
					type="button"
				>
					<span class="sui-icon-close sui-md" aria-hidden="true"></span>
					<span class="sui-screen-reader-text"><?php esc_html_e( 'Close this dialog window', 'smartcrawl-seo' ); ?></span>
				</button>
				<h3 class="sui-box-title sui-lg" id="<?php echo esc_attr( $modal_id ); ?>-dialog-title">
					<?php esc_html_e( 'Feature relocated', 'smartcrawl-seo' ); ?>
				</h3>

				<div class="sui-box-body">
					<p class="sui-description" id="<?php echo esc_attr( $modal_id ); ?>-dialog-description">
						<?php esc_html_e( 'To enhance performance in Gutenberg, SmartCrawl\'s in-post-editor metaboxes have been moved to the editor sidebar.', 'smartcrawl-seo' ); ?>
					</p>
					<img
						class="wds-welcome-modal-sidebar-image"
						src="<?php echo esc_attr( SMARTCRAWL_PLUGIN_URL ); ?>assets/images/new-sidebar.png"
						alt="<?php esc_html_e( 'New Sidebar', 'smartcrawl-seo' ); ?>"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
