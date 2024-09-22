import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import currencies from '../currencies';

const id = uniqueId;
const ProductOffer = {
	availability: {
		id: id(),
		label: __('Availability', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'InStock',
		disallowDeletion: true,
		customSources: {
			options: {
				label: __('Availability', 'smartcrawl-seo'),
				values: {
					InStock: __('In Stock', 'smartcrawl-seo'),
					SoldOut: __('Sold Out', 'smartcrawl-seo'),
					PreOrder: __('PreOrder', 'smartcrawl-seo'),
				},
			},
		},
		description: __(
			'The possible product availability options.',
			'smartcrawl-seo'
		),
	},
	price: {
		id: id(),
		label: __('Price', 'smartcrawl-seo'),
		type: 'Number',
		source: 'number',
		value: '',
		required: true,
		disallowDeletion: true,
		description: __('The offer price of a product.', 'smartcrawl-seo'),
	},
	priceCurrency: {
		id: id(),
		label: __('Price Currency Code', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'USD',
		customSources: {
			options: {
				label: __('Currencies', 'smartcrawl-seo'),
				values: currencies,
			},
		},
		disallowDeletion: true,
		description: __(
			'The currency used to describe the product price, in three-letter ISO 4217 format.',
			'smartcrawl-seo'
		),
	},
	validFrom: {
		id: id(),
		label: __('Valid From', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		disallowDeletion: true,
		description: __(
			'The date when the item becomes valid.',
			'smartcrawl-seo'
		),
	},
	priceValidUntil: {
		id: id(),
		label: __('Valid Until', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		disallowDeletion: true,
		description: __(
			'The date after which the price is no longer available.',
			'smartcrawl-seo'
		),
	},
	url: {
		id: id(),
		label: __('URL', 'smartcrawl-seo'),
		type: 'URL',
		source: 'post_data',
		value: 'post_permalink',
		disallowDeletion: true,
		description: __(
			'A URL to the product web page (that includes the Offer).',
			'smartcrawl-seo'
		),
	},
	/*shippingDetails: {
	id: id(),
	label: __('Shipping Details', 'smartcrawl-seo'),
	disallowDeletion: true,
	disallowAddition: true,
	properties: {
		shippingDestination: {
			id: id(),
			label: __('Shipping Destination', 'smartcrawl-seo'),
			disallowDeletion: true,
			disallowAddition: true,
			properties: {
				addressCountry: {
					id: id(),
					label: __('Address Country', 'smartcrawl-seo'),
					type: 'Text',
					source: 'custom_text',
					value: '',
					description: __('The 2-digit country code, in ISO 3166-1 format e.g. US', 'smartcrawl-seo'),
					disallowDeletion: true,
				},
				addressRegion: {
					id: id(),
					label: __('Address Region', 'smartcrawl-seo'),
					type: 'Text',
					source: 'custom_text',
					value: '',
					description: __('2- or 3-digit ISO 3166-2 subdivision code, without country prefix.', 'smartcrawl-seo'),
					disallowDeletion: true,
				},
				postalCode: {
					id: id(),
					label: __('Postal Code', 'smartcrawl-seo'),
					type: 'Text',
					source: 'custom_text',
					value: '',
					description: __('The postal code. For example, 94043.', 'smartcrawl-seo'),
					disallowDeletion: true,
				},
				postalCodePrefix: {
					id: id(),
					label: __('Postal Code Prefix', 'smartcrawl-seo'),
					type: 'Text',
					source: 'custom_text',
					value: '',
					description: __('A defined range of postal codes indicated by a common textual prefix. Use this property for non-numeric systems, such as the UK.', 'smartcrawl-seo'),
					disallowDeletion: true,
				},
				postalCodeRange: {
					id: id(),
					label: __('Postal Code Range', 'smartcrawl-seo'),
					disallowDeletion: true,
					disallowAddition: true,
					properties: {
						postalCodeBegin: {
							id: id(),
							label: __('First Postal Code', 'smartcrawl-seo'),
							type: 'Text',
							source: 'custom_text',
							value: '',
							description: __('First postal code in a range.', 'smartcrawl-seo'),
							disallowDeletion: true,
						},
						postalCodeEnd: {
							id: id(),
							label: __('Last Postal Code', 'smartcrawl-seo'),
							type: 'Text',
							source: 'custom_text',
							value: '',
							description: __('Last postal code in the range. Needs to be after postalCodeBegin.', 'smartcrawl-seo'),
							disallowDeletion: true,
						}
					}
				}
			}
		},
		deliveryTime: {
			id: id(),
			label: __('Delivery Time', 'smartcrawl-seo'),
			disallowDeletion: true,
			disallowAddition: true,
			properties: {
				businessDays: {
					id: id(),
					label: __('Business Days', 'smartcrawl-seo'),
					disallowDeletion: true,
					disallowAddition: true,
					properties: {
						dayOfWeek: {
							id: id(),
							label: __('Days of Week', 'smartcrawl-seo'),
							labelSingle: __('Day of Week', 'smartcrawl-seo'),
							disallowDeletion: true,
							properties: {
								0: {
									id: id(),
									label: __('Day of Week', 'smartcrawl-seo'),
									type: 'Text',
									disallowDeletion: true,
									disallowFirstItemDeletionOnly: true,
									source: 'options',
									value: 'Monday',
									customSources: {
										options: {
											label: __('Day of Week', 'smartcrawl-seo'),
											values: {
												Monday: __('Monday', 'smartcrawl-seo'),
												Tuesday: __('Tuesday', 'smartcrawl-seo'),
												Wednesday: __('Wednesday', 'smartcrawl-seo'),
												Thursday: __('Thursday', 'smartcrawl-seo'),
												Friday: __('Friday', 'smartcrawl-seo'),
												Saturday: __('Saturday', 'smartcrawl-seo'),
												Sunday: __('Sunday', 'smartcrawl-seo'),
											}
										}
									}
								}
							}
						}
					}
				},
				cutOffTime: {
					id: id(),
					label: __('Cut Off Time', 'smartcrawl-seo'),
					type: 'Text',
					source: 'custom_text',
					value: '',
					disallowDeletion: true,
				},
				handlingTime: {
					id: id(),
					label: __('Handling Time', 'smartcrawl-seo'),
					disallowDeletion: true,
					disallowAddition: true,
					properties: {
						minValue: {
							id: id(),
							label: __('Min Number of Days', 'smartcrawl-seo'),
							type: 'Text',
							source: 'custom_text',
							value: '',
							disallowDeletion: true,
						},
						maxValue: {
							id: id(),
							label: __('Max Number of Days', 'smartcrawl-seo'),
							type: 'Text',
							source: 'custom_text',
							value: '',
							disallowDeletion: true,
						}
					}
				},
				transitTime: {
					id: id(),
					label: __('Transit Time', 'smartcrawl-seo'),
					disallowDeletion: true,
					disallowAddition: true,
					properties: {
						minValue: {
							id: id(),
							label: __('Min Number of Days', 'smartcrawl-seo'),
							type: 'Text',
							source: 'custom_text',
							value: '',
							disallowDeletion: true,
						},
						maxValue: {
							id: id(),
							label: __('Max Number of Days', 'smartcrawl-seo'),
							type: 'Text',
							source: 'custom_text',
							value: '',
							disallowDeletion: true,
						}
					}
				},
			}
		},
		doesNotShip: {
			id: id(),
			label: __('Does Not Ship', 'smartcrawl-seo'),
			type: 'Text',
			source: 'options',
			value: 'True',
			disallowDeletion: true,
			customSources: {
				options: {
					label: __('Boolean Value', 'smartcrawl-seo'),
					values: {
						True: __('True', 'smartcrawl-seo'),
						False: __('False', 'smartcrawl-seo'),
					}
				}
			}
		},
		shippingRate: {
			id: id(),
			label: __('Shipping Rate', 'smartcrawl-seo'),
			disallowDeletion: true,
			disallowAddition: true,
			properties: {
				currency: {
					id: id(),
					label: __('Currency Code', 'smartcrawl-seo'),
					type: 'Text',
					source: 'custom_text',
					value: '',
					disallowDeletion: true,
				},
				value: {
					id: id(),
					label: __('Rate Value', 'smartcrawl-seo'),
					type: 'Text',
					source: 'custom_text',
					value: '',
					disallowDeletion: true,
				}
			}
		},
	}
	}*/
};
export default ProductOffer;
