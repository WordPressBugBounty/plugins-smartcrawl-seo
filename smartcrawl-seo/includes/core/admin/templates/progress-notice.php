<?php
$message = empty( $message ) ? '' : $message;

if ( ! $message ) {
	return;
}
?>

<p>
	<small><?php echo wp_kses_post( $message ); ?></small>
</p>
