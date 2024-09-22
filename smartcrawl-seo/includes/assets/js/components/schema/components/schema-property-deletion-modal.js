import React from 'react';
import { __ } from '@wordpress/i18n';
import Modal from '../../modal';
import Button from '../../button';

export default class SchemaPropertyDeletionModal extends React.Component {
	static defaultProps = {
		requiredProperty: false,
		onCancel: () => false,
		onDelete: () => false,
	};

	render() {
		const { requiredProperty, onCancel, onDelete } = this.props;
		const description = requiredProperty
			? __(
					'You are trying to delete a property that is required by Google. Are you sure you wish to delete it anyway?',
					'smartcrawl-seo'
			  )
			: __(
					'Are you sure you wish to delete this property? You can add it again anytime.',
					'smartcrawl-seo'
			  );

		return (
			<Modal
				small={true}
				id="wds-confirm-property-deletion"
				title={__('Are you sure?', 'smartcrawl-seo')}
				onClose={onCancel}
				focusAfterOpen="wds-schema-property-delete-button"
				description={description}
			>
				<Button
					text={__('Cancel', 'smartcrawl-seo')}
					onClick={onCancel}
					ghost={true}
				/>

				<Button
					text={__('Delete', 'smartcrawl-seo')}
					onClick={onDelete}
					icon="sui-icon-trash"
					color="red"
					id="wds-schema-property-delete-button"
				/>
			</Modal>
		);
	}
}
