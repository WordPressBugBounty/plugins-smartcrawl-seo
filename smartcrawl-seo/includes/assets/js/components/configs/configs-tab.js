import React from 'react';
import ConfigsBoxHeader from './configs-box-header';
import ConfigsFooter from './configs-footer';
import { __, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';
import Notice from '../notices/notice';
import ConfigItem from './config-item';
import { createInterpolateElement } from '@wordpress/element';
import Pagination from '../navigations/pagination';
import ConfigValues from '../../es6/config-values';
import PaginationUtil from '../../utils/pagination-util';

export default class ConfigsTab extends React.Component {
	static defaultProps = {
		syncing: false,
		uploadInProgress: false,
		configs: {},
		onSave: () => false,
		onUpload: () => false,
		onApply: () => false,
		onUpdate: () => false,
		onDownload: () => false,
		onDelete: () => false,
		};

	constructor(props) {
		super(props);

		this.configsPerPage = 10;
		this.state = {
			currentPageNumber: 1,
		};
	}

	componentDidUpdate(prevProps) {
		const configLength = Object.keys(this.getConfigs()).length;
		const prevConfigLength = Object.keys(prevProps.configs || {}).length;

		if (configLength > prevConfigLength) {
			// Config added, switch to first page
			this.setState({
				currentPageNumber: 1,
			});
		} else if (configLength < prevConfigLength) {
			// Config deleted, maybe switch to previous page
			this.setState({
				currentPageNumber: this.newPageNumberAfterDeletion(),
			});
		}
	}

	render() {
		const page = this.getConfigsPage();
		const configs = this.getConfigs();
		const configsExist = Object.keys(configs).length > 0;

		return (
			<div className="sui-box">
				<ConfigsBoxHeader
					uploadInProgress={this.props.uploadInProgress}
					disabled={this.props.syncing}
					onSave={() => this.props.onSave()}
					onUpload={(file) => this.props.onUpload(file)}
				/>
				<div className="sui-box-body">
					<p>
						{createInterpolateElement(
							sprintf(
								// translators: %s: plugin title
								__(
									'Use configs to save preset configurations of <strong>%s</strong>’s settings, then upload and apply them to your other sites in just a few clicks! You can easily apply configs to multiple sites at once via the Hub.',
									'smartcrawl-seo'
								),
								ConfigValues.get('plugin_title', 'admin')
							),
							{ strong: <strong /> }
						)}
					</p>

					<div
						id="wds-configs-list"
						className={classnames({ syncing: this.props.syncing })}
					>
						<div id="wds-configs-list-loader">
							<span className="sui-description">
								<span
									className="sui-icon-loader sui-loading sui-md"
									aria-hidden="true"
								/>{' '}
								{__(
									'Updating the configs list …',
									'smartcrawl-seo'
								)}
							</span>
						</div>

						{!configsExist && (
							<Notice
								type="info"
								message={createInterpolateElement(
									sprintf(
										// translators: %s: plugin title
										__(
											'You don’t have any available config. Save preset configurations of <strong>%s</strong>’s settings, then upload and apply them to your other sites in just a few clicks!',
											'smartcrawl-seo'
										),
										ConfigValues.get(
											'plugin_title',
											'admin'
										)
									),
									{ strong: <strong /> }
								)}
							/>
						)}

						<div id="wds-configs-list-inner">
							{configsExist && (
								<React.Fragment>
									{this.getPagination()}

									<div className="sui-row">
										<div className="sui-col-md-3">
											<small>
												<strong>
													{__(
														'Config Name',
														'smartcrawl-seo'
													)}
												</strong>
											</small>
										</div>
										<div className="sui-col-md-4">
											<small>
												<strong>
													{__(
														'Description',
														'smartcrawl-seo'
													)}
												</strong>
											</small>
										</div>
										<div className="sui-col-md-5">
											<small>
												<strong>
													{__(
														'Date Created',
														'smartcrawl-seo'
													)}
												</strong>
											</small>
										</div>
									</div>

									<div className="sui-accordion sui-accordion-flushed">
										{Object.keys(page).map((configKey) => {
											const config = page[configKey];

											return (
												<ConfigItem
													{...config}
													key={config.id}
													onApply={() =>
														this.props.onApply(
															config.id
														)
													}
													onUpdate={() =>
														this.props.onUpdate(
															config.id
														)
													}
													onDownload={() =>
														this.props.onDownload(
															config.id
														)
													}
													onDelete={() =>
														this.props.onDelete(
															config.id
														)
													}
												/>
											);
										})}
									</div>

									{this.getPagination()}
								</React.Fragment>
							)}

							<ConfigsFooter
								/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	newPageNumberAfterDeletion() {
		const currentPageNumber = this.getCurrentPageNumber();
		return currentPageNumber > this.getPageCount()
			? currentPageNumber - 1
			: currentPageNumber;
	}

	getPageCount() {
		const totalCount = Object.keys(this.props.configs).length;
		const perPage = this.configsPerPage;

		return PaginationUtil.getPageCount(totalCount, perPage);
	}

	getConfigsPage() {
		return PaginationUtil.getPage(
			this.getConfigs(),
			this.getCurrentPageNumber(),
			this.configsPerPage
		);
	}

	getPagination() {
		const configs = this.getConfigs();
		const totalCount = Object.keys(configs).length;
		const perPage = this.configsPerPage;
		const currentPageNumber = this.getCurrentPageNumber();

		if (totalCount > perPage) {
			return (
				<Pagination
					count={totalCount}
					perPage={perPage}
					onClick={(pageNumber) => {
						this.setState({
							currentPageNumber: pageNumber,
						});
					}}
					currentPage={currentPageNumber}
				/>
			);
		}
	}

	getConfigs() {
		return this.props.configs || {};
	}

	getCurrentPageNumber() {
		return this.state.currentPageNumber;
	}
}
