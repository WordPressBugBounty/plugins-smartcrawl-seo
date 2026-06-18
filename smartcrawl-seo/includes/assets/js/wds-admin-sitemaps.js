import ErrorBoundary from './components/error-boundry';
import ReactDom from 'react-dom/client';
import React from 'react';
import UrlUtil from './utils/url-util';
import NewsSitemapTab from './components/sitemaps/news-sitemap-tab';
import ConfigValues from './es6/config-values';
import SitemapTroubleshoot from './components/sitemaps/sitemap-troubleshoot';

(($, undefined) => {
	const newsSitemapTab = document.getElementById('wds-news-sitemap-tab');
	if (newsSitemapTab) {
		const root = ReactDom.createRoot(newsSitemapTab);

		root.render(
			<ErrorBoundary>
				<NewsSitemapTab
					newsSitemapUrl={ConfigValues.get(
						'news_sitemap_url',
						'news'
					)}
					schemaEnabled={ConfigValues.get('schema_enabled', 'news')}
					enabled={ConfigValues.get('enabled', 'news')}
					publication={ConfigValues.get('publication', 'news')}
					postTypes={ConfigValues.get('post_types', 'news')}
				/>
			</ErrorBoundary>
		);
	}

	const sitemapTroubleshooting = document.getElementById(
		'wds-troubleshooting-sitemap-placeholder'
	);
	if (sitemapTroubleshooting) {
		const root = ReactDom.createRoot(sitemapTroubleshooting);

		root.render(
			<React.Fragment>
				<ErrorBoundary>
					<SitemapTroubleshoot
						nonce={ConfigValues.get('nonce', 'sitemaps')}
						sitemapUrl={ConfigValues.get('sitemap_url', 'sitemaps')}
					/>
				</ErrorBoundary>
				<div />
			</React.Fragment>
		);
	}

	const updateSitemapSubsectionVisibility = () => {
		$('.wds-sitemap-toggleable').each(() => {
			const $toggleable = $(this),
				$nestedTable = $toggleable.next('tr').find('.sui-table');

			if ($toggleable.find('input[type="checkbox"]').is(':checked')) {
				$nestedTable.show();
			} else {
				$nestedTable.hide();
			}
		});
	};

	const addQueryParams = (params) => {
		const currentUrl = window.location.href,
			currentParams = new URLSearchParams(window.location.search);

		return (
			currentUrl.split('?')[0] +
			'?' +
			$.param($.extend({}, { page: currentParams.get('page') }, params))
		);
	};

	const overrideNative = (override, callback) =>
		$.post(
			ajaxurl,
			{
				action: 'wds-override-native',
				override: override ? '1' : '0',
				_wds_nonce: Wds.get('sitemaps', 'nonce'),
			},
			callback,
			'json'
		);

	const switchToNativeSitemap = () => {
		const $button = $('#wds-switch-to-native-button');

		Wds.open_dialog(
			'wds-switch-to-native-modal',
			'wds-switch-to-native-sitemap',
			$button.attr('id')
		);
		$button.off().on('click', () => {
			$button.addClass('sui-button-onload');
			overrideNative(false, () => {
				window.location.href = addQueryParams({
					'switched-to-native': 1,
				});
			});
		});
	};

	const switchToSmartcrawlSitemap = () => {
		const $button = $('#wds-switch-to-smartcrawl-button');

		Wds.open_dialog(
			'wds-switch-to-smartcrawl-modal',
			'wds-switch-to-smartcrawl-sitemap',
			$button.attr('id')
		);
		$button.off().on('click', () => {
			$button.addClass('sui-button-onload');
			overrideNative(true, () => {
				window.location.href = addQueryParams({
					'switched-to-sc': 1,
				});
			});
		});
	};

	const manuallyUpdateSitemap = () => {
		const $button = $(this);
		$button.addClass('sui-button-onload');
		return $.post(
			ajaxurl,
			{
				action: 'wds-manually-update-sitemap',
				_wds_nonce: Wds.get('sitemaps', 'nonce'),
			},
			() => {
				Wds.show_floating_message(
					'wds-sitemap-manually-updated',
					Wds.l10n('sitemaps', 'manually_updated'),
					'success'
				);
				$button.removeClass('sui-button-onload');
			},
			'json'
		);
	};

	const deactivateSitemapModule = () => {
		$(this).addClass('sui-button-onload');
		return $.post(
			ajaxurl,
			{
				action: 'wds-deactivate-sitemap-module',
				_wds_nonce: Wds.get('sitemaps', 'nonce'),
			},
			() => {
				window.location.reload();
			},
			'json'
		);
	};

	const init = () => {
		window.Wds.hook_conditionals();
		window.Wds.hook_toggleables();
		window.Wds.conditional_fields();
		window.Wds.dismissible_message();
		window.Wds.vertical_tabs();
		$(document)
			.on(
				'change',
				'.wds-sitemap-toggleable input[type="checkbox"]',
				updateSitemapSubsectionVisibility
			)
			.on('click', '#wds-switch-to-native-sitemap', switchToNativeSitemap)
			.on(
				'click',
				'#wds-switch-to-smartcrawl-sitemap',
				switchToSmartcrawlSitemap
			)
			.on(
				'click',
				'#wds-deactivate-sitemap-module',
				deactivateSitemapModule
			)
			.on('click', '#wds-manually-update-sitemap', manuallyUpdateSitemap);

		$(updateSitemapSubsectionVisibility);
	};

	$(init);
	})(jQuery);
