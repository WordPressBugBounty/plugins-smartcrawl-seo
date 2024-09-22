import React from 'react';
import Dropdown from '../../dropdown';
import DropdownButton from '../../dropdown-button';
import { __ } from '@wordpress/i18n';

export default class SchemaTypeDropdown extends React.Component {
	static defaultProps = {
		onRename: () => false,
		onDuplicate: () => false,
		onDelete: () => false,
	};

	render() {
		return (
			<Dropdown
				buttons={[
					<DropdownButton
						key={0}
						onClick={() => this.props.onRename()}
						icon="sui-icon-pencil"
						text={__('Rename', 'smartcrawl-seo')}
					/>,
					<DropdownButton
						key={1}
						onClick={() => this.props.onDuplicate()}
						icon="sui-icon-copy"
						text={__('Duplicate', 'smartcrawl-seo')}
					/>,
					<DropdownButton
						key={2}
						onClick={() => this.props.onDelete()}
						icon="sui-icon-trash"
						text={__('Delete', 'smartcrawl-seo')}
						red={true}
					/>,
				]}
			/>
		);
	}
}
