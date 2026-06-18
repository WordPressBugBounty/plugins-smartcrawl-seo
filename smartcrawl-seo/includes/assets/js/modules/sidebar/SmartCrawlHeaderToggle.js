import wp from 'wp';
import SmartCrawlIcon from './SmartCrawlIcon';

const { useState, useEffect, createPortal } = wp.element;
const { useSelect, useDispatch } = wp.data;
const { Button } = wp.components;

const SIDEBAR_SCOPE = 'core';
const SIDEBAR_NAME = 'wds-seo-sidebar';
const SIDEBAR_ID = `${SIDEBAR_NAME}/${SIDEBAR_NAME}`;
const SIDEBAR_AREA = SIDEBAR_ID.replace('/', ':');

/**
 * Header toggle when core does not render the pinned sidebar control (narrow viewports).
 * Visibility is handled in wds-sidebar.scss (hide when core pin is already present).
 */
const SmartCrawlHeaderToggle = ({ title }) => {
	const [mountNode, setMountNode] = useState(null);

	const isActive = useSelect(
		(select) =>
			select('core/interface')?.getActiveComplementaryArea(SIDEBAR_SCOPE) ===
			SIDEBAR_ID,
		[]
	);

	const { enableComplementaryArea, disableComplementaryArea } =
		useDispatch('core/interface');

	useEffect(() => {
		const mount = () => {
			const settings = document.querySelector('.editor-header__settings');
			if (!settings) {
				return;
			}

			let root = settings.querySelector('.wds-editor-header-toggle-root');
			if (!root) {
				const saveControl = settings.querySelector(
					'.editor-post-publish-button__button, .editor-post-publish-button-or-toggle'
				);
				root = document.createElement('div');
				root.className =
					'wds-editor-header-toggle-root interface-pinned-items';
				if (saveControl?.parentElement) {
					saveControl.parentElement.insertBefore(root, saveControl);
				} else {
					settings.appendChild(root);
				}
			}

			setMountNode(root);
		};

		mount();
		const retry = window.setTimeout(mount, 100);

		return () => window.clearTimeout(retry);
	}, []);

	if (!mountNode) {
		return null;
	}

	return createPortal(
		<Button
			className="wds-editor-header-toggle"
			icon={<SmartCrawlIcon />}
			label={title}
			isPressed={isActive}
			aria-expanded={isActive}
			aria-controls={SIDEBAR_AREA}
			onClick={() =>
				isActive
					? disableComplementaryArea(SIDEBAR_SCOPE)
					: enableComplementaryArea(SIDEBAR_SCOPE, SIDEBAR_ID)
			}
			showTooltip
			size="compact"
		/>,
		mountNode
	);
};

export default SmartCrawlHeaderToggle;
