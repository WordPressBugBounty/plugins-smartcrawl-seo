<?php
$options = empty( $options ) ? $_view['options'] : $options;

if ( isset( $options['pinterest-verification-status'] ) ) {
	if ( 'fail' === $options['pinterest-verification-status'] ) {
		$this->render_view(
			'notice',
			array(
				'message' => esc_html__( 'Verification failed', 'smartcrawl-seo' ),
				'class'   => 'sui-notice-error',
			)
		);
	} elseif ( '' === $options['pinterest-verification-status'] ) {
		$this->render_view(
			'notice',
			array(
				'message' => esc_html__( 'Your domain verification tag has been added to the <head> of your website.', 'smartcrawl-seo' ),
				'class'   => 'sui-notice-success',
			)
		);
	}
}
?>

<div class="sui-box-settings-row wds-separator-top">
	<div class="sui-box-settings-col-1">
		<label
			for="pinterest-verify"
			class="sui-settings-label"
		><?php esc_html_e( 'Pinterest Meta Tag', 'smartcrawl-seo' ); ?></label>
		<p class="sui-description"><?php esc_html_e( 'This setting will add the meta tag to verify your website with Pinterest.', 'smartcrawl-seo' ); ?></p>
	</div>

	<div class="sui-box-settings-col-2">
		<textarea
			id="pinterest-verify"
			class="sui-form-control"
			name="<?php echo esc_attr( $_view['option_name'] ); ?>[pinterest-verify]"
			placeholder="<?php esc_attr_e( 'Enter your Pinterest meta tag here', 'smartcrawl-seo' ); ?>"
		><?php echo esc_textarea( $options['pinterest-verify'] ); ?></textarea>
		<div class="sui-description">
			<?php if ( empty( $options['pinterest-verify'] ) ) : ?>
				<?php esc_html_e( 'Instructions:', 'smartcrawl-seo' ); ?>
				<ul>
					<li><?php esc_html_e( '1. Go to your Account Settings area.', 'smartcrawl-seo' ); ?></li>
					<li><?php esc_html_e( '2. Scroll to the Website field, add your website and click Confirm website.', 'smartcrawl-seo' ); ?></li>
					<li><?php esc_html_e( '3. Copy the meta tag', 'smartcrawl-seo' ); ?></li>
				</ul>
			<?php else : ?>
				<?php esc_html_e( 'To remove verification simply remove this meta tag.', 'smartcrawl-seo' ); ?>
			<?php endif; ?>
		</div>
	</div>
</div>
