import wp from 'wp';
import ConfigValues from '../../../es6/config-values';

const { createElement } = wp.element;

/** @jsx createElement */

export function renderSidebarPortal(children, className = '') {
	if (
		typeof document === 'undefined' ||
		!document.body ||
		typeof wp.element.createPortal !== 'function'
	) {
		return null;
	}

	return wp.element.createPortal(
		<div className={`wds-gutenberg-sidebar ${className}`.trim()}>
			{children}
		</div>,
		document.body
	);
}

export function renderSidebarModal(children) {
	const suiVersion = ConfigValues.get('sui_version', 'sidebar') || '2-12-23';

	return renderSidebarPortal(
		children,
		`sui-${suiVersion} wds-sidebar-modal-root`
	);
}
