import uniqueId from 'lodash-es/uniqueId';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import ConfigValues from '../../../es6/config-values';
import Article from './property-blueprints/article/article';
import Event from './property-blueprints/event/event';
import Product from './property-blueprints/product/product';
import WooProduct from './property-blueprints/product/woo-product';
import FAQPage from './property-blueprints/faq-page/faq-page';
import HowTo from './property-blueprints/how-to/how-to';
import LocalBusiness from './property-blueprints/local-business/local-business';
import FoodEstablishment from './property-blueprints/local-business/food-establishment';
import WooSimpleProduct from './property-blueprints/product/woo-simple-product';
import Recipe from './property-blueprints/recipe/recipe';
import JobPosting from './property-blueprints/job-posting/job-posting';
import Book from './property-blueprints/book/book';
import Course from './property-blueprints/course/course';
import SoftwareApplication from './property-blueprints/software-application/software-application';
import MobileApplication from './property-blueprints/software-application/mobile-application';
import WebApplication from './property-blueprints/software-application/web-application';
import Movie from './property-blueprints/movie/movie';
import WebPage from './property-blueprints/web-page/web-page';
import React from 'react';
import { cloneDeep } from 'lodash-es';
import { isCustomType } from '../utils/type-utils';

const id = uniqueId;

export const CUSTOM_TYPE = 'Custom';

const schemaTypesData = {
	Article: {
		label: __('Article', 'smartcrawl-seo'),
		type: 'Article',
		icon: 'wds-custom-icon-file-alt',
		properties: Article,
	},
	BlogPosting: {
		label: __('Blog Posting', 'smartcrawl-seo'),
		type: 'BlogPosting',
		icon: 'wds-custom-icon-blog',
		parent: 'Article',
	},
	NewsArticle: {
		label: __('News Article', 'smartcrawl-seo'),
		type: 'NewsArticle',
		icon: 'wds-custom-icon-newspaper',
		parent: 'Article',
	},
	Book: {
		label: __('Book', 'smartcrawl-seo'),
		type: 'Book',
		icon: 'wds-custom-icon-book',
		properties: Book,
		subText: createInterpolateElement(
			__(
				'Note: Rich Results Test supports the Books Schema type for a limited number of sites for the time being, so please go to the <a>Structured Data testing tool</a> to check your book type.',
				'smartcrawl-seo'
			),
			{
				a: (
					<a
						target="_blank"
						href="https://search.google.com/structured-data/testing-tool/u/0/"
						rel="noreferrer"
					/>
				),
			}
		),
	},
	Course: {
		label: __('Course', 'smartcrawl-seo'),
		type: 'Course',
		icon: 'wds-custom-icon-graduation-cap',
		properties: Course,
	},
	Event: {
		label: __('Event', 'smartcrawl-seo'),
		type: 'Event',
		icon: 'wds-custom-icon-calendar-check',
		properties: Event,
	},
	FAQPage: {
		label: __('FAQ Page', 'smartcrawl-seo'),
		type: 'FAQPage',
		icon: 'wds-custom-icon-question-circle',
		properties: FAQPage,
	},
	HowTo: {
		label: __('How To', 'smartcrawl-seo'),
		type: 'HowTo',
		icon: 'wds-custom-icon-list-alt',
		properties: HowTo,
	},
	JobPosting: {
		label: __('Job Posting', 'smartcrawl-seo'),
		type: 'JobPosting',
		icon: 'wds-custom-icon-user-tie',
		properties: JobPosting,
	},
	LocalBusiness: {
		label: __('Local Business', 'smartcrawl-seo'),
		type: 'LocalBusiness',
		icon: 'wds-custom-icon-store',
		condition: { id: id(), lhs: 'homepage', operator: '=', rhs: '' },
		properties: LocalBusiness,
		afterAdditionNotice: sprintf(
			// translators: %s: Link to documentation.
			__(
				'If you wish to add a Local Business with <strong>multiple locations</strong>, you can easily do this by duplicating your Local Business type and editing the properties. Alternatively, you can just add a new Local Business type. To learn more, see our %s.'
			),
			sprintf(
				'<a target="_blank" href="https://wpmudev.com/docs/wpmu-dev-plugins/smartcrawl/#schema">%s</a>',
				__('Schema Documentation', 'smartcrawl-seo')
			)
		),
	},
	AnimalShelter: {
		label: __('Animal Shelter', 'smartcrawl-seo'),
		type: 'AnimalShelter',
		icon: 'wds-custom-icon-paw',
		parent: 'LocalBusiness',
	},
	AutomotiveBusiness: {
		label: __('Automotive Business', 'smartcrawl-seo'),
		type: 'AutomotiveBusiness',
		icon: 'wds-custom-icon-car',
		parent: 'LocalBusiness',
	},
	AutoBodyShop: {
		label: __('Auto Body Shop', 'smartcrawl-seo'),
		type: 'AutoBodyShop',
		icon: 'wds-custom-icon-car-building',
		parent: 'AutomotiveBusiness',
	},
	AutoDealer: {
		label: __('Auto Dealer', 'smartcrawl-seo'),
		type: 'AutoDealer',
		icon: 'wds-custom-icon-car-garage',
		parent: 'AutomotiveBusiness',
	},
	AutoPartsStore: {
		label: __('Auto Parts Store', 'smartcrawl-seo'),
		type: 'AutoPartsStore',
		icon: 'wds-custom-icon-tire',
		parent: 'AutomotiveBusiness',
	},
	AutoRental: {
		label: __('Auto Rental', 'smartcrawl-seo'),
		type: 'AutoRental',
		icon: 'wds-custom-icon-garage-car',
		parent: 'AutomotiveBusiness',
	},
	AutoRepair: {
		label: __('Auto Repair', 'smartcrawl-seo'),
		type: 'AutoRepair',
		icon: 'wds-custom-icon-car-mechanic',
		parent: 'AutomotiveBusiness',
	},
	AutoWash: {
		label: __('Auto Wash', 'smartcrawl-seo'),
		type: 'AutoWash',
		icon: 'wds-custom-icon-car-wash',
		parent: 'AutomotiveBusiness',
	},
	GasStation: {
		label: __('Gas Station', 'smartcrawl-seo'),
		type: 'GasStation',
		icon: 'wds-custom-icon-gas-pump',
		parent: 'AutomotiveBusiness',
	},
	MotorcycleDealer: {
		label: __('Motorcycle Dealer', 'smartcrawl-seo'),
		type: 'MotorcycleDealer',
		icon: 'wds-custom-icon-motorcycle',
		parent: 'AutomotiveBusiness',
	},
	MotorcycleRepair: {
		label: __('Motorcycle Repair', 'smartcrawl-seo'),
		type: 'MotorcycleRepair',
		icon: 'wds-custom-icon-tools',
		parent: 'AutomotiveBusiness',
	},
	ChildCare: {
		label: __('Child Care', 'smartcrawl-seo'),
		type: 'ChildCare',
		icon: 'wds-custom-icon-baby',
		parent: 'LocalBusiness',
	},
	DryCleaningOrLaundry: {
		label: __('Dry Cleaning Or Laundry', 'smartcrawl-seo'),
		type: 'DryCleaningOrLaundry',
		icon: 'wds-custom-icon-washer',
		parent: 'LocalBusiness',
	},
	EmergencyService: {
		label: __('Emergency Service', 'smartcrawl-seo'),
		type: 'EmergencyService',
		icon: 'wds-custom-icon-siren-on',
		parent: 'LocalBusiness',
	},
	FireStation: {
		label: __('Fire Station', 'smartcrawl-seo'),
		type: 'FireStation',
		icon: 'wds-custom-icon-fire-extinguisher',
		parent: 'EmergencyService',
	},
	Hospital: {
		label: __('Hospital', 'smartcrawl-seo'),
		type: 'Hospital',
		icon: 'wds-custom-icon-hospital-alt',
		parent: 'EmergencyService',
	},
	PoliceStation: {
		label: __('Police Station', 'smartcrawl-seo'),
		type: 'PoliceStation',
		icon: 'wds-custom-icon-police-box',
		parent: 'EmergencyService',
	},
	EmploymentAgency: {
		label: __('Employment Agency', 'smartcrawl-seo'),
		type: 'EmploymentAgency',
		icon: 'wds-custom-icon-user-tie',
		parent: 'LocalBusiness',
	},
	EntertainmentBusiness: {
		label: __('Entertainment Business', 'smartcrawl-seo'),
		type: 'EntertainmentBusiness',
		icon: 'wds-custom-icon-tv-music',
		parent: 'LocalBusiness',
	},
	AdultEntertainment: {
		label: __('Adult Entertainment', 'smartcrawl-seo'),
		type: 'AdultEntertainment',
		icon: 'wds-custom-icon-diamond',
		parent: 'EntertainmentBusiness',
	},
	AmusementPark: {
		label: __('Amusement Park', 'smartcrawl-seo'),
		type: 'AmusementPark',
		icon: 'wds-custom-icon-helicopter',
		parent: 'EntertainmentBusiness',
	},
	ArtGallery: {
		label: __('Art Gallery', 'smartcrawl-seo'),
		type: 'ArtGallery',
		icon: 'wds-custom-icon-image',
		parent: 'EntertainmentBusiness',
	},
	Casino: {
		label: __('Casino', 'smartcrawl-seo'),
		type: 'Casino',
		icon: 'wds-custom-icon-coins',
		parent: 'EntertainmentBusiness',
	},
	ComedyClub: {
		label: __('Comedy Club', 'smartcrawl-seo'),
		type: 'ComedyClub',
		icon: 'wds-custom-icon-theater-masks',
		parent: 'EntertainmentBusiness',
	},
	MovieTheater: {
		label: __('Movie Theater', 'smartcrawl-seo'),
		type: 'MovieTheater',
		icon: 'wds-custom-icon-camera-movie',
		parent: 'EntertainmentBusiness',
	},
	NightClub: {
		label: __('Night Club', 'smartcrawl-seo'),
		type: 'NightClub',
		icon: 'wds-custom-icon-cocktail',
		parent: 'EntertainmentBusiness',
	},
	FinancialService: {
		label: __('Financial Service', 'smartcrawl-seo'),
		type: 'FinancialService',
		icon: 'wds-custom-icon-briefcase',
		parent: 'LocalBusiness',
	},
	AccountingService: {
		label: __('Accounting Service', 'smartcrawl-seo'),
		type: 'AccountingService',
		icon: 'wds-custom-icon-cabinet-filing',
		parent: 'FinancialService',
	},
	AutomatedTeller: {
		label: __('Automated Teller', 'smartcrawl-seo'),
		type: 'AutomatedTeller',
		icon: 'wds-custom-icon-credit-card',
		parent: 'FinancialService',
	},
	BankOrCreditUnion: {
		label: __('Bank Or Credit Union', 'smartcrawl-seo'),
		type: 'BankOrCreditUnion',
		icon: 'wds-custom-icon-landmark',
		parent: 'FinancialService',
	},
	InsuranceAgency: {
		label: __('Insurance Agency', 'smartcrawl-seo'),
		type: 'InsuranceAgency',
		icon: 'wds-custom-icon-car-crash',
		parent: 'FinancialService',
	},
	FoodEstablishment: {
		label: __('Food Establishment', 'smartcrawl-seo'),
		type: 'FoodEstablishment',
		icon: 'wds-custom-icon-carrot',
		condition: { id: id(), lhs: 'homepage', operator: '=', rhs: '' },
		parent: 'LocalBusiness',
		properties: FoodEstablishment,
	},
	Bakery: {
		label: __('Bakery', 'smartcrawl-seo'),
		type: 'Bakery',
		icon: 'wds-custom-icon-croissant',
		parent: 'FoodEstablishment',
	},
	BarOrPub: {
		label: __('Bar Or Pub', 'smartcrawl-seo'),
		type: 'BarOrPub',
		icon: 'wds-custom-icon-glass-whiskey-rocks',
		parent: 'FoodEstablishment',
	},
	Brewery: {
		label: __('Brewery', 'smartcrawl-seo'),
		type: 'Brewery',
		icon: 'wds-custom-icon-beer',
		parent: 'FoodEstablishment',
	},
	CafeOrCoffeeShop: {
		label: __('Cafe Or Coffee Shop', 'smartcrawl-seo'),
		type: 'CafeOrCoffeeShop',
		icon: 'wds-custom-icon-coffee',
		parent: 'FoodEstablishment',
	},
	Distillery: {
		label: __('Distillery', 'smartcrawl-seo'),
		type: 'Distillery',
		icon: 'wds-custom-icon-flask-potion',
		parent: 'FoodEstablishment',
	},
	FastFoodRestaurant: {
		label: __('Fast Food Restaurant', 'smartcrawl-seo'),
		type: 'FastFoodRestaurant',
		icon: 'wds-custom-icon-burger-soda',
		parent: 'FoodEstablishment',
	},
	IceCreamShop: {
		label: __('Ice Cream Shop', 'smartcrawl-seo'),
		type: 'IceCreamShop',
		icon: 'wds-custom-icon-ice-cream',
		parent: 'FoodEstablishment',
	},
	Restaurant: {
		label: __('Restaurant', 'smartcrawl-seo'),
		type: 'Restaurant',
		icon: 'wds-custom-icon-utensils-alt',
		parent: 'FoodEstablishment',
	},
	Winery: {
		label: __('Winery', 'smartcrawl-seo'),
		type: 'Winery',
		icon: 'wds-custom-icon-wine-glass-alt',
		parent: 'FoodEstablishment',
	},
	GovernmentOffice: {
		label: __('Government Office', 'smartcrawl-seo'),
		type: 'GovernmentOffice',
		icon: 'wds-custom-icon-university',
		parent: 'LocalBusiness',
	},
	PostOffice: {
		label: __('Post Office', 'smartcrawl-seo'),
		type: 'PostOffice',
		icon: 'wds-custom-icon-mailbox',
		parent: 'GovernmentOffice',
	},
	HealthAndBeautyBusiness: {
		label: __('Health And Beauty', 'smartcrawl-seo'),
		labelFull: __('Health And Beauty Business', 'smartcrawl-seo'),
		type: 'HealthAndBeautyBusiness',
		icon: 'wds-custom-icon-heartbeat',
		parent: 'LocalBusiness',
	},
	BeautySalon: {
		label: __('Beauty Salon', 'smartcrawl-seo'),
		type: 'BeautySalon',
		icon: 'wds-custom-icon-lips',
		parent: 'HealthAndBeautyBusiness',
	},
	DaySpa: {
		label: __('Day Spa', 'smartcrawl-seo'),
		type: 'DaySpa',
		icon: 'wds-custom-icon-spa',
		parent: 'HealthAndBeautyBusiness',
	},
	HairSalon: {
		label: __('Hair Salon', 'smartcrawl-seo'),
		type: 'HairSalon',
		icon: 'wds-custom-icon-cut',
		parent: 'HealthAndBeautyBusiness',
	},
	HealthClub: {
		label: __('Health Club', 'smartcrawl-seo'),
		type: 'HealthClub',
		icon: 'wds-custom-icon-notes-medical',
		parent: 'HealthAndBeautyBusiness',
	},
	NailSalon: {
		label: __('Nail Salon', 'smartcrawl-seo'),
		type: 'NailSalon',
		icon: 'wds-custom-icon-hands-heart',
		parent: 'HealthAndBeautyBusiness',
	},
	TattooParlor: {
		label: __('Tattoo Parlor', 'smartcrawl-seo'),
		type: 'TattooParlor',
		icon: 'wds-custom-icon-moon-stars',
		parent: 'HealthAndBeautyBusiness',
	},
	HomeAndConstructionBusiness: {
		label: __('Home And Construction', 'smartcrawl-seo'),
		labelFull: __('Home And Construction Business', 'smartcrawl-seo'),
		type: 'HomeAndConstructionBusiness',
		icon: 'wds-custom-icon-home-heart',
		parent: 'LocalBusiness',
	},
	Electrician: {
		label: __('Electrician', 'smartcrawl-seo'),
		type: 'Electrician',
		icon: 'wds-custom-icon-bolt',
		parent: 'HomeAndConstructionBusiness',
	},
	GeneralContractor: {
		label: __('General Contractor', 'smartcrawl-seo'),
		type: 'GeneralContractor',
		icon: 'wds-custom-icon-house-leave',
		parent: 'HomeAndConstructionBusiness',
	},
	HVACBusiness: {
		label: __('HVACBusiness', 'smartcrawl-seo'),
		type: 'HVACBusiness',
		icon: 'wds-custom-icon-temperature-frigid',
		parent: 'HomeAndConstructionBusiness',
	},
	HousePainter: {
		label: __('House Painter', 'smartcrawl-seo'),
		type: 'HousePainter',
		icon: 'wds-custom-icon-paint-roller',
		parent: 'HomeAndConstructionBusiness',
	},
	Locksmith: {
		label: __('Locksmith', 'smartcrawl-seo'),
		type: 'Locksmith',
		icon: 'wds-custom-icon-key',
		parent: 'HomeAndConstructionBusiness',
	},
	MovingCompany: {
		label: __('Moving Company', 'smartcrawl-seo'),
		type: 'MovingCompany',
		icon: 'wds-custom-icon-dolly',
		parent: 'HomeAndConstructionBusiness',
	},
	Plumber: {
		label: __('Plumber', 'smartcrawl-seo'),
		type: 'Plumber',
		icon: 'wds-custom-icon-faucet',
		parent: 'HomeAndConstructionBusiness',
	},
	RoofingContractor: {
		label: __('Roofing Contractor', 'smartcrawl-seo'),
		type: 'RoofingContractor',
		icon: 'wds-custom-icon-home',
		parent: 'HomeAndConstructionBusiness',
	},
	InternetCafe: {
		label: __('Internet Cafe', 'smartcrawl-seo'),
		type: 'InternetCafe',
		icon: 'wds-custom-icon-mug-hot',
		parent: 'LocalBusiness',
	},
	LegalService: {
		label: __('Legal Service', 'smartcrawl-seo'),
		type: 'LegalService',
		icon: 'wds-custom-icon-balance-scale-right',
		parent: 'LocalBusiness',
	},
	Attorney: {
		label: __('Attorney', 'smartcrawl-seo'),
		type: 'Attorney',
		icon: 'wds-custom-icon-gavel',
		parent: 'LegalService',
	},
	Notary: {
		label: __('Notary', 'smartcrawl-seo'),
		type: 'Notary',
		icon: 'wds-custom-icon-pen-alt',
		parent: 'LegalService',
	},
	Library: {
		label: __('Library', 'smartcrawl-seo'),
		type: 'Library',
		icon: 'wds-custom-icon-books',
		parent: 'LocalBusiness',
	},
	LodgingBusiness: {
		label: __('Lodging Business', 'smartcrawl-seo'),
		type: 'LodgingBusiness',
		icon: 'wds-custom-icon-bed',
		parent: 'LocalBusiness',
	},
	BedAndBreakfast: {
		label: __('Bed And Breakfast', 'smartcrawl-seo'),
		type: 'BedAndBreakfast',
		icon: 'wds-custom-icon-bed-empty',
		parent: 'LodgingBusiness',
	},
	Campground: {
		label: __('Campground', 'smartcrawl-seo'),
		type: 'Campground',
		icon: 'wds-custom-icon-campground',
		parent: 'LodgingBusiness',
	},
	Hostel: {
		label: __('Hostel', 'smartcrawl-seo'),
		type: 'Hostel',
		icon: 'wds-custom-icon-bed-bunk',
		parent: 'LodgingBusiness',
	},
	Hotel: {
		label: __('Hotel', 'smartcrawl-seo'),
		type: 'Hotel',
		icon: 'wds-custom-icon-h-square',
		parent: 'LodgingBusiness',
	},
	Motel: {
		label: __('Motel', 'smartcrawl-seo'),
		type: 'Motel',
		icon: 'wds-custom-icon-concierge-bell',
		parent: 'LodgingBusiness',
	},
	Resort: {
		label: __('Resort', 'smartcrawl-seo'),
		type: 'Resort',
		icon: 'wds-custom-icon-umbrella-beach',
		parent: 'LodgingBusiness',
	},
	MedicalBusiness: {
		label: __('Medical Business', 'smartcrawl-seo'),
		type: 'MedicalBusiness',
		icon: 'wds-custom-icon-clinic-medical',
		parent: 'LocalBusiness',
	},
	CommunityHealth: {
		label: __('Community Health', 'smartcrawl-seo'),
		type: 'CommunityHealth',
		icon: 'wds-custom-icon-hospital-user',
		parent: 'MedicalBusiness',
	},
	Dentist: {
		label: __('Dentist', 'smartcrawl-seo'),
		type: 'Dentist',
		icon: 'wds-custom-icon-tooth',
		parent: 'MedicalBusiness',
	},
	Dermatology: {
		label: __('Dermatology', 'smartcrawl-seo'),
		type: 'Dermatology',
		icon: 'wds-custom-icon-allergies',
		parent: 'MedicalBusiness',
	},
	DietNutrition: {
		label: __('Diet Nutrition', 'smartcrawl-seo'),
		type: 'DietNutrition',
		icon: 'wds-custom-icon-weight',
		parent: 'MedicalBusiness',
	},
	Emergency: {
		label: __('Emergency', 'smartcrawl-seo'),
		type: 'Emergency',
		icon: 'wds-custom-icon-ambulance',
		parent: 'MedicalBusiness',
	},
	Geriatric: {
		label: __('Geriatric', 'smartcrawl-seo'),
		type: 'Geriatric',
		icon: 'wds-custom-icon-loveseat',
		parent: 'MedicalBusiness',
	},
	Gynecologic: {
		label: __('Gynecologic', 'smartcrawl-seo'),
		type: 'Gynecologic',
		icon: 'wds-custom-icon-female',
		parent: 'MedicalBusiness',
	},
	MedicalClinic: {
		label: __('Medical Clinic', 'smartcrawl-seo'),
		type: 'MedicalClinic',
		icon: 'wds-custom-icon-clinic-medical',
		parent: 'MedicalBusiness',
	},
	Midwifery: {
		label: __('Midwifery', 'smartcrawl-seo'),
		type: 'Midwifery',
		icon: 'wds-custom-icon-baby',
		parent: 'MedicalBusiness',
	},
	Nursing: {
		label: __('Nursing', 'smartcrawl-seo'),
		type: 'Nursing',
		icon: 'wds-custom-icon-user-nurse',
		parent: 'MedicalBusiness',
	},
	Obstetric: {
		label: __('Obstetric', 'smartcrawl-seo'),
		type: 'Obstetric',
		icon: 'wds-custom-icon-baby',
		parent: 'MedicalBusiness',
	},
	Oncologic: {
		label: __('Oncologic', 'smartcrawl-seo'),
		type: 'Oncologic',
		icon: 'wds-custom-icon-user-md',
		parent: 'MedicalBusiness',
	},
	Optician: {
		label: __('Optician', 'smartcrawl-seo'),
		type: 'Optician',
		icon: 'wds-custom-icon-eye',
		parent: 'MedicalBusiness',
	},
	Optometric: {
		label: __('Optometric', 'smartcrawl-seo'),
		type: 'Optometric',
		icon: 'wds-custom-icon-glasses-alt',
		parent: 'MedicalBusiness',
	},
	Otolaryngologic: {
		label: __('Otolaryngologic', 'smartcrawl-seo'),
		type: 'Otolaryngologic',
		icon: 'wds-custom-icon-user-md-chat',
		parent: 'MedicalBusiness',
	},
	Pediatric: {
		label: __('Pediatric', 'smartcrawl-seo'),
		type: 'Pediatric',
		icon: 'wds-custom-icon-child',
		parent: 'MedicalBusiness',
	},
	Pharmacy: {
		label: __('Pharmacy', 'smartcrawl-seo'),
		type: 'Pharmacy',
		icon: 'wds-custom-icon-pills',
		parent: 'MedicalBusiness',
	},
	Physician: {
		label: __('Physician', 'smartcrawl-seo'),
		type: 'Physician',
		icon: 'wds-custom-icon-user-md',
		parent: 'MedicalBusiness',
	},
	Physiotherapy: {
		label: __('Physiotherapy', 'smartcrawl-seo'),
		type: 'Physiotherapy',
		icon: 'wds-custom-icon-user-injured',
		parent: 'MedicalBusiness',
	},
	PlasticSurgery: {
		label: __('Plastic Surgery', 'smartcrawl-seo'),
		type: 'PlasticSurgery',
		icon: 'wds-custom-icon-lips',
		parent: 'MedicalBusiness',
	},
	Podiatric: {
		label: __('Podiatric', 'smartcrawl-seo'),
		type: 'Podiatric',
		icon: 'wds-custom-icon-shoe-prints',
		parent: 'MedicalBusiness',
	},
	PrimaryCare: {
		label: __('Primary Care', 'smartcrawl-seo'),
		type: 'PrimaryCare',
		icon: 'wds-custom-icon-comment-alt-medical',
		parent: 'MedicalBusiness',
	},
	Psychiatric: {
		label: __('Psychiatric', 'smartcrawl-seo'),
		type: 'Psychiatric',
		icon: 'wds-custom-icon-head-side-brain',
		parent: 'MedicalBusiness',
	},
	PublicHealth: {
		label: __('Public Health', 'smartcrawl-seo'),
		type: 'PublicHealth',
		icon: 'wds-custom-icon-clipboard-user',
		parent: 'MedicalBusiness',
	},
	ProfessionalService: {
		label: __('Professional Service', 'smartcrawl-seo'),
		type: 'ProfessionalService',
		icon: 'wds-custom-icon-user-hard-hat',
		parent: 'LocalBusiness',
	},
	RadioStation: {
		label: __('Radio Station', 'smartcrawl-seo'),
		type: 'RadioStation',
		icon: 'wds-custom-icon-radio',
		parent: 'LocalBusiness',
	},
	RealEstateAgent: {
		label: __('Real Estate Agent', 'smartcrawl-seo'),
		type: 'RealEstateAgent',
		icon: 'wds-custom-icon-sign',
		parent: 'LocalBusiness',
	},
	RecyclingCenter: {
		label: __('Recycling Center', 'smartcrawl-seo'),
		type: 'RecyclingCenter',
		icon: 'wds-custom-icon-recycle',
		parent: 'LocalBusiness',
	},
	SelfStorage: {
		label: __('Self Storage', 'smartcrawl-seo'),
		type: 'SelfStorage',
		icon: 'wds-custom-icon-warehouse-alt',
		parent: 'LocalBusiness',
	},
	ShoppingCenter: {
		label: __('Shopping Center', 'smartcrawl-seo'),
		type: 'ShoppingCenter',
		icon: 'wds-custom-icon-bags-shopping',
		parent: 'LocalBusiness',
	},
	SportsActivityLocation: {
		label: __('Sports Activity Location', 'smartcrawl-seo'),
		type: 'SportsActivityLocation',
		icon: 'wds-custom-icon-volleyball-ball',
		parent: 'LocalBusiness',
	},
	BowlingAlley: {
		label: __('Bowling Alley', 'smartcrawl-seo'),
		type: 'BowlingAlley',
		icon: 'wds-custom-icon-bowling-pins',
		parent: 'SportsActivityLocation',
	},
	ExerciseGym: {
		label: __('Exercise Gym', 'smartcrawl-seo'),
		type: 'ExerciseGym',
		icon: 'wds-custom-icon-dumbbell',
		parent: 'SportsActivityLocation',
	},
	GolfCourse: {
		label: __('Golf Course', 'smartcrawl-seo'),
		type: 'GolfCourse',
		icon: 'wds-custom-icon-golf-club',
		parent: 'SportsActivityLocation',
	},
	PublicSwimmingPool: {
		label: __('Public Swimming Pool', 'smartcrawl-seo'),
		type: 'PublicSwimmingPool',
		icon: 'wds-custom-icon-swimmer',
		parent: 'SportsActivityLocation',
	},
	SkiResort: {
		label: __('Ski Resort', 'smartcrawl-seo'),
		type: 'SkiResort',
		icon: 'wds-custom-icon-skiing',
		parent: 'SportsActivityLocation',
	},
	SportsClub: {
		label: __('Sports Club', 'smartcrawl-seo'),
		type: 'SportsClub',
		icon: 'wds-custom-icon-football-ball',
		parent: 'SportsActivityLocation',
	},
	StadiumOrArena: {
		label: __('Stadium Or Arena', 'smartcrawl-seo'),
		type: 'StadiumOrArena',
		icon: 'wds-custom-icon-pennant',
		parent: 'SportsActivityLocation',
	},
	TennisComplex: {
		label: __('Tennis Complex', 'smartcrawl-seo'),
		type: 'TennisComplex',
		icon: 'wds-custom-icon-racquet',
		parent: 'SportsActivityLocation',
	},
	Store: {
		label: __('Store', 'smartcrawl-seo'),
		type: 'Store',
		icon: 'wds-custom-icon-store-alt',
		parent: 'LocalBusiness',
	},
	BikeStore: {
		label: __('Bike Store', 'smartcrawl-seo'),
		type: 'BikeStore',
		icon: 'wds-custom-icon-bicycle',
		parent: 'Store',
	},
	BookStore: {
		label: __('Book Store', 'smartcrawl-seo'),
		type: 'BookStore',
		icon: 'wds-custom-icon-book',
		parent: 'Store',
	},
	ClothingStore: {
		label: __('Clothing Store', 'smartcrawl-seo'),
		type: 'ClothingStore',
		icon: 'wds-custom-icon-tshirt',
		parent: 'Store',
	},
	ComputerStore: {
		label: __('Computer Store', 'smartcrawl-seo'),
		type: 'ComputerStore',
		icon: 'wds-custom-icon-laptop',
		parent: 'Store',
	},
	ConvenienceStore: {
		label: __('Convenience Store', 'smartcrawl-seo'),
		type: 'ConvenienceStore',
		icon: 'wds-custom-icon-shopping-basket',
		parent: 'Store',
	},
	DepartmentStore: {
		label: __('Department Store', 'smartcrawl-seo'),
		type: 'DepartmentStore',
		icon: 'wds-custom-icon-bags-shopping',
		parent: 'Store',
	},
	ElectronicsStore: {
		label: __('Electronics Store', 'smartcrawl-seo'),
		type: 'ElectronicsStore',
		icon: 'wds-custom-icon-boombox',
		parent: 'Store',
	},
	Florist: {
		label: __('Florist', 'smartcrawl-seo'),
		type: 'Florist',
		icon: 'wds-custom-icon-flower-daffodil',
		parent: 'Store',
	},
	FurnitureStore: {
		label: __('Furniture Store', 'smartcrawl-seo'),
		type: 'FurnitureStore',
		icon: 'wds-custom-icon-chair',
		parent: 'Store',
	},
	GardenStore: {
		label: __('Garden Store', 'smartcrawl-seo'),
		type: 'GardenStore',
		icon: 'wds-custom-icon-seedling',
		parent: 'Store',
	},
	GroceryStore: {
		label: __('Grocery Store', 'smartcrawl-seo'),
		type: 'GroceryStore',
		icon: 'wds-custom-icon-shopping-cart',
		parent: 'Store',
	},
	HardwareStore: {
		label: __('Hardware Store', 'smartcrawl-seo'),
		type: 'HardwareStore',
		icon: 'wds-custom-icon-computer-speaker',
		parent: 'Store',
	},
	HobbyShop: {
		label: __('Hobby Shop', 'smartcrawl-seo'),
		type: 'HobbyShop',
		icon: 'wds-custom-icon-game-board',
		parent: 'Store',
	},
	HomeGoodsStore: {
		label: __('Home Goods Store', 'smartcrawl-seo'),
		type: 'HomeGoodsStore',
		icon: 'wds-custom-icon-coffee-pot',
		parent: 'Store',
	},
	JewelryStore: {
		label: __('Jewelry Store', 'smartcrawl-seo'),
		type: 'JewelryStore',
		icon: 'wds-custom-icon-rings-wedding',
		parent: 'Store',
	},
	LiquorStore: {
		label: __('Liquor Store', 'smartcrawl-seo'),
		type: 'LiquorStore',
		icon: 'wds-custom-icon-jug',
		parent: 'Store',
	},
	MensClothingStore: {
		label: __('Mens Clothing Store', 'smartcrawl-seo'),
		type: 'MensClothingStore',
		icon: 'wds-custom-icon-user-tie',
		parent: 'Store',
	},
	MobilePhoneStore: {
		label: __('Mobile Phone Store', 'smartcrawl-seo'),
		type: 'MobilePhoneStore',
		icon: 'wds-custom-icon-mobile-alt',
		parent: 'Store',
	},
	MovieRentalStore: {
		label: __('Movie Rental Store', 'smartcrawl-seo'),
		type: 'MovieRentalStore',
		icon: 'wds-custom-icon-film',
		parent: 'Store',
	},
	MusicStore: {
		label: __('Music Store', 'smartcrawl-seo'),
		type: 'MusicStore',
		icon: 'wds-custom-icon-album-collection',
		parent: 'Store',
	},
	OfficeEquipmentStore: {
		label: __('Office Equipment Store', 'smartcrawl-seo'),
		type: 'OfficeEquipmentStore',
		icon: 'wds-custom-icon-chair-office',
		parent: 'Store',
	},
	OutletStore: {
		label: __('Outlet Store', 'smartcrawl-seo'),
		type: 'OutletStore',
		icon: 'wds-custom-icon-tags',
		parent: 'Store',
	},
	PawnShop: {
		label: __('Pawn Shop', 'smartcrawl-seo'),
		type: 'PawnShop',
		icon: 'wds-custom-icon-ring',
		parent: 'Store',
	},
	PetStore: {
		label: __('Pet Store', 'smartcrawl-seo'),
		type: 'PetStore',
		icon: 'wds-custom-icon-dog-leashed',
		parent: 'Store',
	},
	ShoeStore: {
		label: __('Shoe Store', 'smartcrawl-seo'),
		type: 'ShoeStore',
		icon: 'wds-custom-icon-boot',
		parent: 'Store',
	},
	SportingGoodsStore: {
		label: __('Sporting Goods Store', 'smartcrawl-seo'),
		type: 'SportingGoodsStore',
		icon: 'wds-custom-icon-baseball',
		parent: 'Store',
	},
	TireShop: {
		label: __('Tire Shop', 'smartcrawl-seo'),
		type: 'TireShop',
		icon: 'wds-custom-icon-tire',
		parent: 'Store',
	},
	ToyStore: {
		label: __('Toy Store', 'smartcrawl-seo'),
		type: 'ToyStore',
		icon: 'wds-custom-icon-gamepad-alt',
		parent: 'Store',
	},
	WholesaleStore: {
		label: __('Wholesale Store', 'smartcrawl-seo'),
		type: 'WholesaleStore',
		icon: 'wds-custom-icon-boxes-alt',
		parent: 'Store',
	},
	TelevisionStation: {
		label: __('Television Station', 'smartcrawl-seo'),
		type: 'TelevisionStation',
		icon: 'wds-custom-icon-tv-retro',
		parent: 'LocalBusiness',
	},
	TouristInformationCenter: {
		label: __('Tourist Information Center', 'smartcrawl-seo'),
		type: 'TouristInformationCenter',
		icon: 'wds-custom-icon-map-marked-alt',
		parent: 'LocalBusiness',
	},
	TravelAgency: {
		label: __('Travel Agency', 'smartcrawl-seo'),
		type: 'TravelAgency',
		icon: 'wds-custom-icon-plane',
		parent: 'LocalBusiness',
	},
	Movie: {
		label: __('Movie', 'smartcrawl-seo'),
		type: 'Movie',
		icon: 'wds-custom-icon-camera-movie',
		properties: Movie,
	},
	Product: {
		label: __('Product', 'smartcrawl-seo'),
		type: 'Product',
		icon: 'wds-custom-icon-shopping-cart',
		properties: Product,
		subText: createInterpolateElement(
			__(
				'Note: You must include one of the following properties: <strong>review</strong>, <strong>aggregateRating</strong> or <strong>offers</strong>. Once you include one of either a review or aggregateRating or offers, the other two properties will become recommended by the Rich Results Test.',
				'smartcrawl-seo'
			),
			{ strong: <strong /> }
		),
	},
	Recipe: {
		label: __('Recipe', 'smartcrawl-seo'),
		type: 'Recipe',
		icon: 'wds-custom-icon-soup',
		properties: Recipe,
	},
	SoftwareApplication: {
		label: __('Software Application', 'smartcrawl-seo'),
		type: 'SoftwareApplication',
		icon: 'wds-custom-icon-laptop-code',
		properties: SoftwareApplication,
		subText: createInterpolateElement(
			__(
				'Note: You must include one of the following properties: <strong>review</strong> or <strong>aggregateRating</strong>. Once you include one of either a review or aggregateRating, the other property will become recommended by the Rich Results Test.',
				'smartcrawl-seo'
			),
			{ strong: <strong /> }
		),
	},
	MobileApplication: {
		label: __('Mobile Application', 'smartcrawl-seo'),
		type: 'MobileApplication',
		icon: 'wds-custom-icon-mobile-alt',
		properties: MobileApplication,
		parent: 'SoftwareApplication',
	},
	WebApplication: {
		label: __('Web Application', 'smartcrawl-seo'),
		type: 'WebApplication',
		icon: 'wds-custom-icon-browser',
		properties: WebApplication,
		parent: 'SoftwareApplication',
	},
	WooProduct: {
		label: __('WooCommerce Product', 'smartcrawl-seo'),
		type: 'WooProduct',
		icon: 'wds-custom-icon-woocommerce',
		condition: {
			id: id(),
			lhs: 'post_type',
			operator: '=',
			rhs: 'product',
		},
		properties: WooProduct,
		disabled: !ConfigValues.get('woocommerce', 'schema_types'),
		subTypesNotice: createInterpolateElement(
			__(
				'Note: Simple Product includes the <strong>Offer</strong> property, while Variable product includes the <strong>AggregateOffer</strong> property to fit the variation in pricing to your product.',
				'smartcrawl-seo'
			),
			{ strong: <strong /> }
		),
		subText: createInterpolateElement(
			__(
				'Note: You must include one of the following properties: <strong>review</strong>, <strong>aggregateRating</strong> or <strong>offers</strong>. Once you include one of either a review or aggregateRating or offers, the other two properties will become recommended by the Rich Results Test.',
				'smartcrawl-seo'
			),
			{ strong: <strong /> }
		),
		schemaReplacementNotice: __(
			'On the pages where this schema type is printed, schema generated by WooCommerce will be replaced to avoid generating multiple product schemas for the same product page.',
			'smartcrawl-seo'
		),
	},
	WooVariableProduct: {
		label: __('Variable Product', 'smartcrawl-seo'),
		labelFull: __('WooCommerce Variable Product', 'smartcrawl-seo'),
		type: 'WooVariableProduct',
		icon: 'wds-custom-icon-woocommerce',
		condition: {
			id: id(),
			lhs: 'product_type',
			operator: '=',
			rhs: 'WC_Product_Variable',
		},
		disabled: !ConfigValues.get('woocommerce', 'schema_types'),
		parent: 'WooProduct',
	},
	WooSimpleProduct: {
		label: __('Simple Product', 'smartcrawl-seo'),
		labelFull: __('WooCommerce Simple Product', 'smartcrawl-seo'),
		type: 'WooSimpleProduct',
		icon: 'wds-custom-icon-woocommerce',
		condition: {
			id: id(),
			lhs: 'product_type',
			operator: '=',
			rhs: 'WC_Product_Simple',
		},
		properties: WooSimpleProduct,
		disabled: !ConfigValues.get('woocommerce', 'schema_types'),
		parent: 'WooProduct',
	},
	WebPage: {
		label: __('Web Page', 'smartcrawl-seo'),
		type: 'WebPage',
		icon: '',
		properties: WebPage,
		hidden: true,
	},
	Custom: {
		label: __('Custom Type', 'smartcrawl-seo'),
		type: CUSTOM_TYPE,
		icon: 'wds-custom-icon-brackets-curly',
		properties: {
			'@type': {
				id: '@type',
				label: __('@type', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				required: true,
				disallowDeletion: true,
				placeholder: __('e.g. Product', 'smartcrawl-seo'),
			},
		},
	},
};

export default class SchemaTypeBlueprints {
	static #cache = {};

	static getParentTree(typeKey) {
		let tree = {};
		let currentTypeKey = typeKey;
		let currentType = schemaTypesData[typeKey];
		do {
			tree = Object.assign({ [currentTypeKey]: currentType }, tree);
			currentTypeKey =
				currentType.parent &&
				schemaTypesData.hasOwnProperty(currentType.parent)
					? currentType.parent
					: false;
			currentType = currentTypeKey
				? schemaTypesData[currentTypeKey]
				: false;
		} while (currentTypeKey);

		return tree;
	}

	static findDirectChildren(typeKey) {
		return Object.keys(schemaTypesData).filter((potentialChildKey) => {
			return schemaTypesData[potentialChildKey].parent === typeKey;
		});
	}

	static makeTypeData(typeKey) {
		const parentTree = this.getParentTree(typeKey);
		const typeData = Object.assign({}, ...Object.values(parentTree));

		delete typeData.parent;

		typeData.children = this.findDirectChildren(typeKey);

		return typeData;
	}

	static getTypeBlueprint(type, customProperties = false) {
		if (!this.#cache.hasOwnProperty(type)) {
			this.#cache[type] = this.makeTypeData(type);
		}

		let typeBlueprint = this.#cache[type];
		if (isCustomType(type) && customProperties) {
			typeBlueprint = Object.assign({}, typeBlueprint, {
				properties: cloneDeep(customProperties),
			});
		}

		return typeBlueprint;
	}

	static getTopLevelTypeKeys() {
		return Object.keys(schemaTypesData).filter((potentialTopKey) => {
			return !schemaTypesData[potentialTopKey].parent;
		});
	}
}
