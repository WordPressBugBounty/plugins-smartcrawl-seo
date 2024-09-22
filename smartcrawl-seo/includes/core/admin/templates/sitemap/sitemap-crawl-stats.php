<?php
/**
 * @var Seo_Report $crawl_report
 *
 * @package SmartCrawl
 */

namespace SmartCrawl;

$crawl_report = empty( $crawl_report ) ? null : $crawl_report;
if ( ! $crawl_report ) {
	return;
}
$in_progress = $crawl_report->is_in_progress();
if ( ! $in_progress && ! $crawl_report->has_data() ) {
	return;
}
$issue_count      = (int) $crawl_report->get_issues_count();
$score_class      = $issue_count > 0 ? 'sui-icon-info sui-warning' : 'sui-icon-check-tick sui-success';
$whitelabel_class = \SmartCrawl\Controllers\White_Label::get()->summary_class();
$override_native  = empty( $override_native ) ? false : $override_native;
?>

<div class="sui-box sui-summary <?php echo esc_attr( $whitelabel_class ); ?>">
	<div class="sui-summary-image-space">
	</div>

	<div class="sui-summary-segment">
		<div class="sui-summary-details">
			<div>
				<?php if ( $in_progress ) : ?>
					<span class="sui-icon-loader sui-loading" aria-hidden="true"></span>
				<?php else : ?>
					<span class="sui-summary-large"><?php echo esc_html( $issue_count ); ?></span>
					<span class="<?php echo esc_attr( $score_class ); ?>"></span>
				<?php endif; ?>
				<span class="sui-summary-sub"><?php echo esc_html( _n( 'Sitemap Issue', 'Sitemap Issues', $issue_count, 'smartcrawl-seo' ) ); ?></span>
			</div>
		</div>
	</div>

	<div class="sui-summary-segment">
		<ul class="sui-list">
			<li>
				<span class="sui-list-label">
					<?php esc_html_e( 'Sitemap Type', 'smartcrawl-seo' ); ?>
				</span>

				<span class="sui-list-detail">
					<span class="sui-tag">
						<?php
						echo $override_native
							? esc_html( \smartcrawl_get_plugin_title() )
							: esc_html__( 'WordPress Core', 'smartcrawl-seo' );
						?>
					</span>
				</span>
			</li>
			<li>
				<span class="sui-list-label"><?php esc_html_e( 'Total URLs Discovered', 'smartcrawl-seo' ); ?></span>
				<span class="sui-list-detail">
					<?php if ( $in_progress ) : ?>
						<span class="sui-icon-loader sui-loading" aria-hidden="true"></span>
						<small><?php esc_html_e( 'Crawl in progress', 'smartcrawl-seo' ); ?></small>
					<?php else : ?>
						<?php echo intval( $crawl_report->get_meta( 'total' ) ); ?>
					<?php endif; ?>
				</span>
			</li>
			<li>
				<span class="sui-list-label">
					<?php esc_html_e( 'Invisible URLs', 'smartcrawl-seo' ); ?>
					<span
						class="sui-tooltip"
						data-tooltip="<?php esc_html_e( 'URLs that are missing from your sitemap', 'smartcrawl-seo' ); ?>"
					>
						<span class="sui-icon-info"></span>
					</span>
				</span>
				<span class="sui-list-detail wds-invisible-urls-count">
					<?php if ( $in_progress ) : ?>
						<span class="sui-icon-loader sui-loading" aria-hidden="true"></span>
						<small><?php esc_html_e( 'Crawl in progress', 'smartcrawl-seo' ); ?></small>
					<?php else : ?>
						<?php echo intval( $crawl_report->get_issues_count( 'sitemap' ) ); ?>
					<?php endif; ?>
				</span>
			</li>
		</ul>
	</div>
</div>
