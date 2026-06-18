/**
 * SidebarGooglePreview — sidebar Google preview + Edit Meta.
 *
 * Mirrors the classic metabox GooglePreview (improvement/SMA-2648 and master):
 * same preview markup, macro replacement, thresholds, and labels. Edit Meta
 * fields use SidebarSeoMetaFields instead of OptimumIndicatorField +
 * InsertVariables so the sidebar stays on wp.element / wp.data / wp.components
 * only (no jQuery Select2 in this panel).
 *
 * SEO title and meta description are fully controlled from core/editor meta
 * via props (useSeoMeta); there is no duplicate local string state for them.
 */
import { __ } from '@wordpress/i18n';
import wp from 'wp';
import ConfigValues from '../../../../es6/config-values';
import Button from '../../../../components/button';
import classnames from 'classnames';
import PostObjectFetcher from '../../../../es6/post-object-fetcher';
import PostObjectsCache from '../../../../es6/post-objects-cache';
import MacroReplacement from '../../../../es6/macro-replacement';
import GutenbergEditor from '../../../../es6/gutenberg-editor';
import StringUtils from '../../../../es6/string-utils';
import FloatingNoticePlaceholder from '../../../../components/floating-notice-placeholder';
import NoticeUtil from '../../../../utils/notice-util';
import SidebarSeoMetaFields from './SidebarSeoMetaFields';
import Modal from '../../../../components/modal';
import { renderSidebarModal } from '../../utils/sidebar-portal';

const { Component, createElement, Fragment } = wp.element;

/** @jsx createElement */
/** @jsxFrag Fragment */

const macros = ConfigValues.get('macros', 'metabox');
const titleMinLength = ConfigValues.get('title_min_length', 'metabox');
const titleMaxLength = ConfigValues.get('title_max_length', 'metabox');
const descMinLength = ConfigValues.get('metadesc_min_length', 'metabox');
const descMaxLength = ConfigValues.get('metadesc_max_length', 'metabox');

export default class SidebarGooglePreview extends Component {
	static defaultProps = {
		seoTitle: '',
		seoDesc: '',
		onSaveTitle: () => false,
		onSaveDesc: () => false,
		// Unchanged from GooglePreview.
		previewTitle: '',
		previewDesc: '',
		onChangeTitle: () => false,
		onChangeDesc: () => false,
	};

	constructor(props) {
		super(props);

		const postObjectsCache = new PostObjectsCache();
		const postObjectFetcher = new PostObjectFetcher(postObjectsCache);

		this.macroReplacement = new MacroReplacement(postObjectFetcher);

		this.editor = new GutenbergEditor();

		this.unsubscribe = null;

		this.state = {
			openForm: false,
			loading: false,
			error: false,
			metaTitle: ConfigValues.get('meta_title', 'metabox'),
			metaDesc: ConfigValues.get('meta_desc', 'metabox'),
			phTitle: '',
			phDesc: '',
			permalink: ConfigValues.get('post_url', 'metabox'),
			editorTitle: '',
			editorDesc: '',
		};
	}

	componentDidMount() {
		// Always Gutenberg in sidebar context; subscribe is safe to call here.
		this.unsubscribe = wp.data.subscribe(() => {
			this.refresh();
		});

		this.refreshPreview();
		this.refreshPlaceholder();
	}

	componentWillUnmount() {
		if (this.unsubscribe && typeof this.unsubscribe === 'function') {
			this.unsubscribe();
			this.unsubscribe = null;
		}

		if (this.editor && typeof this.editor.destroy === 'function') {
			this.editor.destroy();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { editorTitle: prevEditorTitle, editorDesc: prevEditorDesc } =
			prevState;
		const { editorTitle, editorDesc } = this.state;

		const editorContentChanged =
			editorTitle !== prevEditorTitle || editorDesc !== prevEditorDesc;

		const metaStringsChanged =
			prevProps.seoTitle !== this.props.seoTitle ||
			prevProps.seoDesc !== this.props.seoDesc;

		if (editorContentChanged) {
			this.refreshPreview();
			this.refreshPlaceholder();
		} else if (metaStringsChanged) {
			this.refreshPreviewTitle(this.props.seoTitle);
			this.refreshPreviewDesc(this.props.seoDesc);
		}
	}

	refresh() {
		const post = this.editor.get_data();
		this.setState({
			editorTitle: post.get_title(),
			editorDesc: post.get_content(),
		});
	}

	refreshPlaceholder() {
		const post = this.editor.get_data();

		Promise.all([
			this.macroReplacement.replace(this.state.metaTitle, post),
			this.macroReplacement.replace(this.state.metaDesc, post),
		])
			.then((values) => {
				this.setState({
					phTitle: StringUtils.process_string(values[0]),
					phDesc: StringUtils.process_string(values[1]),
				});
			})
			.catch((error) => {
				this.setState({ error });
			});
	}

	refreshPreview() {
		this.setState({ loading: true }, () => {
			this.refreshPreviewTitle();
			this.refreshPreviewDesc();

			this.setState({ loading: false });
		});
	}

	refreshPreviewTitle(titleOverride) {
		const post = this.editor.get_data();
		const { metaTitle } = this.state;
		const raw =
			titleOverride !== undefined ? titleOverride : this.props.seoTitle;

		this.macroReplacement
			.replace(raw || metaTitle, post)
			.then((value) => {
				this.props.onChangeTitle(StringUtils.process_string(value));
			})
			.catch((error) => {
				this.setState({ error });
			});
	}

	refreshPreviewDesc(descOverride) {
		const post = this.editor.get_data();
		const { metaDesc } = this.state;
		const raw =
			descOverride !== undefined ? descOverride : this.props.seoDesc;

		this.macroReplacement
			.replace(raw || metaDesc, post)
			.then((value) => {
				this.props.onChangeDesc(StringUtils.process_string(value));
			})
			.catch((error) => {
				this.setState({ error });
			});
	}

	handleChangeTitle(title) {
		this.props.onSaveTitle(title);
		this.refreshPreviewTitle(title);
	}

	handleChangeDesc(description) {
		this.props.onSaveDesc(description);
		this.refreshPreviewDesc(description);
	}

	render() {
		const { openForm, loading, error, phTitle, phDesc, permalink } =
			this.state;

		const { previewTitle, previewDesc, seoTitle, seoDesc } = this.props;

		return (
			<>
				<FloatingNoticePlaceholder id="wds-metabox-preview-error" />

				{!!error &&
					NoticeUtil.showErrorNotice(
						'wds-metabox-preview-error',
						error,
						false
					)}

				<div className="wds-metabox-preview">
					<label className="sui-label">
						{__('Google Preview', 'smartcrawl-seo')}
					</label>

					<div
						className={classnames(
							'wds-preview-container',
							loading && 'wds-preview-loading'
						)}
					>
						<div className="wds-preview">
							<div className="wds-preview-title">
								<h3>
									<a href={permalink}>
										{StringUtils.truncate_string(
											previewTitle,
											titleMaxLength
										)}
									</a>
								</h3>
							</div>
							<div className="wds-preview-url">
								<a href={permalink}>{permalink}</a>
							</div>
							<div className="wds-preview-meta">
								{StringUtils.truncate_string(
									previewDesc,
									descMaxLength
								)}
							</div>
						</div>
						<p className="wds-preview-description">
							{__(
								'A preview of how your title and meta will appear in Google Search.',
								'wds'
							)}
						</p>
					</div>
				</div>
				<div className="wds-edit-meta">
					<Button
						id="wds-sidebar-edit-meta-button"
						icon="sui-icon-pencil"
						color="ghost"
						text={__('Edit Meta', 'wds-text-domain')}
						onClick={() => this.setState({ openForm: true })}
					></Button>

					{!!openForm &&
						renderSidebarModal(
							<Modal
								id="wds-sidebar-edit-meta-modal"
								title={__('Edit Meta', 'smartcrawl-seo')}
								onClose={() =>
									this.setState({ openForm: false })
								}
								focusAfterOpen="wds-sidebar-edit-meta-modal-close-button"
								focusAfterClose="wds-sidebar-edit-meta-button"
								dialogClasses={{
									'wds-sidebar-edit-meta-modal': true,
								}}
							>
								<SidebarSeoMetaFields
									macros={macros}
									titleMinLength={titleMinLength}
									titleMaxLength={titleMaxLength}
									descMinLength={descMinLength}
									descMaxLength={descMaxLength}
									seoTitle={seoTitle}
									seoDesc={seoDesc}
									onSaveTitle={(v) =>
										this.handleChangeTitle(v)
									}
									onSaveDesc={(v) => this.handleChangeDesc(v)}
									previewTitle={previewTitle}
									previewDesc={previewDesc}
									phTitle={phTitle}
									phDesc={phDesc}
								/>
							</Modal>
						)}
				</div>
			</>
		);
	}
}
