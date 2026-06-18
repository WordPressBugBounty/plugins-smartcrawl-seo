/**
 * Sidebar SEO title / description fields for Gutenberg only.
 *
 * - Values are controlled by the parent from core/editor meta (useSeoMeta).
 * - Character count matches OptimumIndicatorField (resolved preview length when set).
 * - Variable insertion matches metabox InsertVariables: append token to end of value
 *   (handleSelect type 0 → state.value + selectedKey), not caret-based insertion.
 */
import wp from 'wp';
import { __, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';
import StringUtils from '../../../../es6/string-utils';
import { renderSidebarPortal } from '../../utils/sidebar-portal';

const { createElement, Fragment, useEffect, useRef, useState } = wp.element;
const { Dropdown, MenuGroup, MenuItem, Button: CompsButton } = wp.components;

/** @jsx createElement */
/** @jsxFrag Fragment */

const VAR_PLUS_SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Same SVG “+” for SEO title and description variable buttons (matches inset control glyph).
 */
function VariableInsertPlusIcon() {
	return createElement(
		'svg',
		{
			className: 'wds-sidebar-var-plus-svg',
			xmlns: VAR_PLUS_SVG_NS,
			viewBox: '0 0 16 16',
			width: 10,
			height: 10,
			fill: 'none',
			focusable: 'false',
			'aria-hidden': 'true',
		},
		createElement('path', {
			stroke: 'currentColor',
			strokeWidth: 2,
			strokeLinecap: 'round',
			d: 'M8 3.5v9M3.5 8h9',
		})
	);
}

function displayedCharLength(value, preview, placeholder) {
	return StringUtils.normalize_whitespace(
		StringUtils.strip_html(value ? preview || value : placeholder)
	).length;
}

/**
 * Status class for .wds-optimum-indicator — must stay in lockstep with
 * includes/assets/js/components/input-fields/optimum-indicator.js.
 *
 * Color (green / yellow only, per _optimum-indicator.scss — no red):
 * - `under`, `over` → yellow bar + warning icon
 * - `almost-under`, `just-right`, `almost-over` → green bar + check icon
 *
 * @param length
 * @param lowerRaw
 * @param upperRaw
 */
function optimumBarClass(length, lowerRaw, upperRaw) {
	const lower = parseInt(lowerRaw, 10);
	const upper = parseInt(upperRaw, 10);
	if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
		return 'under';
	}

	const offset = (8 / 100) * upper;
	const almostLower = lower + offset;
	const almostUpper = upper - offset;

	if (length > upper) {
		return 'over';
	}
	if (almostUpper < length && length <= upper) {
		return 'almost-over';
	}
	if (almostLower <= length && length <= almostUpper) {
		return 'just-right';
	}
	if (lower <= length && length < almostLower) {
		return 'almost-under';
	}
	return 'under';
}

function optimumBarPercent(length, lowerRaw, upperRaw) {
	const lower = parseInt(lowerRaw, 10);
	const upper = parseInt(upperRaw, 10);
	if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
		return 0;
	}

	const idealLen = (lower + upper) / 2;
	let percentage = (length / idealLen) * 100;
	percentage = percentage / 2;
	return percentage > 100 ? 100 : percentage;
}

function SeoMetaField({
	inputId,
	labelTitle,
	labelSubtitle,
	charRangeSuffix,
	value,
	onChange,
	placeholder,
	preview,
	lower,
	upper,
	variables,
	multiline,
	rows,
	inlineVariablePicker,
}) {
	const [isVariableDropdownOpen, setVariableDropdownOpen] = useState(false);
	const [variableDropdownPosition, setVariableDropdownPosition] =
		useState(null);
	const variableDropdownAnchorRef = useRef(null);
	const length = displayedCharLength(value, preview, placeholder);
	const barClass = optimumBarClass(length, lower, upper);
	const barPct = optimumBarPercent(length, lower, upper);

	const variableEntries =
		variables && typeof variables === 'object'
			? Object.keys(variables).map((key) => [key, variables[key]])
			: [];

	const useInlineVariablePicker =
		inlineVariablePicker && variableEntries.length > 0;

	useEffect(() => {
		if (!isVariableDropdownOpen || !variableDropdownAnchorRef.current) {
			setVariableDropdownPosition(null);
			return undefined;
		}

		const updatePosition = () => {
			const anchorRect =
				variableDropdownAnchorRef.current?.getBoundingClientRect();
			if (!anchorRect) {
				return;
			}

			const gap = 4;
			const edge = 12;
			const maxMenuHeight = 240;
			const viewportHeight =
				window.innerHeight || document.documentElement.clientHeight;
			const spaceBelow = viewportHeight - anchorRect.bottom - edge - gap;
			const spaceAbove = anchorRect.top - edge - gap;
			const openAbove = spaceBelow < 120 && spaceAbove > spaceBelow;
			const availableSpace = openAbove ? spaceAbove : spaceBelow;

			setVariableDropdownPosition({
				left: Math.max(edge, anchorRect.left),
				width: Math.max(0, anchorRect.width),
				maxHeight: Math.max(
					80,
					Math.min(maxMenuHeight, availableSpace)
				),
				...(openAbove
					? {
							top: 'auto',
							bottom: viewportHeight - anchorRect.top + gap,
					  }
					: { top: anchorRect.bottom + gap, bottom: 'auto' }),
			});
		};

		updatePosition();
		window.addEventListener('resize', updatePosition);
		document.addEventListener('scroll', updatePosition, true);

		return () => {
			window.removeEventListener('resize', updatePosition);
			document.removeEventListener('scroll', updatePosition, true);
		};
	}, [isVariableDropdownOpen]);

	/**
	 * Same as InsertVariables.handleSelect when type === 0 (variable from dropdown):
	 * updatedValue = this.state.value + value  →  current string + macro key.
	 *
	 * @param token
	 */
	const appendVariable = (token) => {
		const current = value != null ? value : '';
		onChange(current + token);
	};

	const sharedInputProps = {
		id: inputId,
		className: 'sui-form-control',
		value: value != null ? value : '',
		placeholder,
		onChange: (e) => onChange(e.target.value),
	};

	return (
		<div className="sui-form-field wds-sidebar-seo-form-field">
			<label className="sui-label wds-field-label" htmlFor={inputId}>
				<div className="wds-label-title">{labelTitle}</div>
				{labelSubtitle ? (
					<div className="wds-label-subtitle">{labelSubtitle}</div>
				) : null}
			</label>

			<div className="wds-optimum-indicator-wrapper">
				<div
					className={classnames(
						'wds-sidebar-seo-input-wrap',
						variableEntries.length > 0 &&
							'wds-sidebar-seo-input-wrap--has-toggle'
					)}
				>
					{useInlineVariablePicker ? (
						<div className="wds-sidebar-seo-input-row">
							<div
								ref={variableDropdownAnchorRef}
								className="wds-sidebar-seo-inline-var-wrap wds-sidebar-seo-input-grow"
							>
								<div
									className={classnames(
										'wds-input-with-button',
										multiline &&
											'wds-input-with-button--textarea-inset'
									)}
								>
									{multiline ? (
										<textarea
											{...sharedInputProps}
											rows={rows || 2}
										/>
									) : (
										<input
											type="text"
											{...sharedInputProps}
										/>
									)}
									{multiline ? (
										<button
											type="button"
											className="wds-add-variable-button"
											onClick={() =>
												setVariableDropdownOpen(
													(prev) => !prev
												)
											}
											aria-expanded={
												isVariableDropdownOpen
											}
											aria-label={__(
												'Insert variable',
												'smartcrawl-seo'
											)}
										>
											<VariableInsertPlusIcon />
										</button>
									) : (
										<div className="wds-input-with-button-partition">
											<button
												type="button"
												className="wds-add-variable-button"
												onClick={() =>
													setVariableDropdownOpen(
														(prev) => !prev
													)
												}
												aria-expanded={
													isVariableDropdownOpen
												}
												aria-label={__(
													'Insert variable',
													'smartcrawl-seo'
												)}
											>
												<VariableInsertPlusIcon />
											</button>
										</div>
									)}
								</div>
								{isVariableDropdownOpen &&
									variableDropdownPosition &&
									renderSidebarPortal(
										<div
											className="wds-variable-dropdown wds-variable-dropdown--portal"
											style={variableDropdownPosition}
										>
											{variableEntries.map(
												([key, labelText]) => (
													<div
														key={key}
														className="wds-variable-item"
														onClick={() => {
															appendVariable(key);
															setVariableDropdownOpen(
																false
															);
														}}
													>
														<span>{labelText}</span>
														<span>{key}</span>
													</div>
												)
											)}
										</div>,
										'wds-sidebar-variable-portal'
									)}
							</div>
						</div>
					) : (
						<div className="wds-sidebar-seo-input-row">
							<div className="wds-sidebar-seo-input-grow">
								{multiline ? (
									<textarea
										{...sharedInputProps}
										rows={rows || 2}
									/>
								) : (
									<input type="text" {...sharedInputProps} />
								)}
							</div>
							{variableEntries.length > 0 && (
								<div className="wds-sidebar-seo-var-anchor">
									<Dropdown
										popoverProps={{
											placement: 'bottom-end',
											className:
												'wds-sidebar-variable-popover',
										}}
										renderToggle={({
											isOpen,
											onToggle,
										}) => (
											<CompsButton
												type="button"
												variant="secondary"
												className="wds-sidebar-seo-var-toggle"
												onClick={onToggle}
												aria-expanded={isOpen}
												aria-label={__(
													'Insert variable',
													'smartcrawl-seo'
												)}
											>
												+
											</CompsButton>
										)}
										renderContent={({ onClose }) => (
											<div className="wds-sidebar-variable-menu-scroll">
												<MenuGroup>
													{variableEntries.map(
														([key, labelText]) => (
															<MenuItem
																key={key}
																onClick={() => {
																	appendVariable(
																		key
																	);
																	onClose();
																}}
															>
																{labelText}
															</MenuItem>
														)
													)}
												</MenuGroup>
											</div>
										)}
									/>
								</div>
							)}
						</div>
					)}
				</div>

				<div className={classnames('wds-optimum-indicator', barClass)}>
					<span style={{ width: barPct + '%' }}></span>
					<span>
						{sprintf(
							/* translators: 1: current length, 2: range e.g. "50-65 characters" */
							__('%1$d / %2$s', 'smartcrawl-seo'),
							length,
							charRangeSuffix
						)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default function SidebarSeoMetaFields({
	macros,
	titleMinLength,
	titleMaxLength,
	descMinLength,
	descMaxLength,
	seoTitle,
	seoDesc,
	onSaveTitle,
	onSaveDesc,
	previewTitle,
	previewDesc,
	phTitle,
	phDesc,
}) {
	return (
		<>
			<SeoMetaField
				inputId="wds-sidebar-seo-title"
				labelTitle={__('SEO Title', 'smartcrawl-seo')}
				labelSubtitle={__(
					'Include your focus keyphrases. 50-65 characters recommended.',
					'smartcrawl-seo'
				)}
				charRangeSuffix={__('50-65 characters', 'smartcrawl-seo')}
				value={seoTitle}
				onChange={onSaveTitle}
				placeholder={phTitle}
				preview={previewTitle}
				lower={titleMinLength}
				upper={titleMaxLength}
				variables={macros}
				multiline={false}
				inlineVariablePicker
			/>
			<SeoMetaField
				inputId="wds-sidebar-seo-desc"
				labelTitle={__('Description', 'smartcrawl-seo')}
				labelSubtitle={__(
					'Include your focus keyphrases. 120-160 characters recommended.',
					'smartcrawl-seo'
				)}
				charRangeSuffix={__('120-160 characters', 'smartcrawl-seo')}
				value={seoDesc}
				onChange={onSaveDesc}
				placeholder={phDesc}
				preview={previewDesc}
				lower={descMinLength}
				upper={descMaxLength}
				variables={macros}
				multiline={true}
				rows={4}
				inlineVariablePicker
			/>
		</>
	);
}
