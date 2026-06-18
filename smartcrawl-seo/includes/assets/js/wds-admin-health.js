;(function ($) {
	$(init);

	function init() {
		$(document).on('submit', '#wds-settings-form', save_health_settings);
	}

	function save_health_settings(e) {
		e.preventDefault();
		e.stopPropagation();

		var $button = $('.sui-box-footer .sui-button.sui-button-blue'),
			$settings_form = $('#wds-settings-form');
		var data = $settings_form.serialize();
		$button.addClass('sui-button-onload');

		$.post(ajaxurl + '?' + data, {
			action: 'wds-save-health-settings',
			_wds_nonce: Wds.get('health', 'nonce'),
		}).done(function () {
			window.location.href =
				location.href.replace(location.hash, '') +
				'&' +
				$.param({
					'settings-updated': 'true',
				});
		});
	}
})(jQuery);
