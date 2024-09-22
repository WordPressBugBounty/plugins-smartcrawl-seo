import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash-es/uniqueId';
import JobHiringOrganization from './job-hiring-organization';
import JobPlace from './job-place';
import JobApplicantLocationRequirement from './job-applicant-location-requirement';
import JobSalaryMonetaryAmount from './job-salary-monetary-amount';

const id = uniqueId;
const JobPosting = {
	title: {
		id: id(),
		label: __('Title', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_title',
		description: __(
			'The title of the job (not the title of the posting). For example, "Software Engineer" or "Barista".',
			'smartcrawl-seo'
		),
		required: true,
	},
	description: {
		id: id(),
		label: __('Description', 'smartcrawl-seo'),
		type: 'TextFull',
		source: 'post_data',
		value: 'post_content',
		description: __(
			"The full description of the job in HTML format. The description should be a complete representation of the job, including job responsibilities, qualifications, skills, working hours, education requirements, and experience requirements. The description can't be the same as the title.",
			'smartcrawl-seo'
		),
		required: true,
	},
	datePosted: {
		id: id(),
		label: __('Date Posted', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'post_data',
		value: 'post_date',
		description: __(
			'The original date that employer posted the job in ISO 8601 format.',
			'smartcrawl-seo'
		),
		required: true,
	},
	validThrough: {
		id: id(),
		label: __('Valid Through', 'smartcrawl-seo'),
		type: 'DateTime',
		source: 'datetime',
		value: '',
		description: __(
			'The date when the job posting will expire in ISO 8601 format. This is required for job postings that have an expiration date.',
			'smartcrawl-seo'
		),
	},
	employmentType: {
		id: id(),
		label: __('Employment Type', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'FULL_TIME',
		disallowDeletion: true,
		description: __('Type of employment.', 'smartcrawl-seo'),
		customSources: {
			options: {
				label: __('Employment Type', 'smartcrawl-seo'),
				values: {
					FULL_TIME: __('Full Time', 'smartcrawl-seo'),
					PART_TIME: __('Part Time', 'smartcrawl-seo'),
					CONTRACTOR: __('Contractor', 'smartcrawl-seo'),
					TEMPORARY: __('Temporary', 'smartcrawl-seo'),
					INTERN: __('Intern', 'smartcrawl-seo'),
					VOLUNTEER: __('Volunteer', 'smartcrawl-seo'),
					PER_DIEM: __('Per Diem', 'smartcrawl-seo'),
					OTHER: __('Other', 'smartcrawl-seo'),
				},
			},
		},
	},
	jobLocationType: {
		id: id(),
		label: __('Job Location Type', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: '',
		description: __(
			'Set this property with the value TELECOMMUTE for jobs in which the employee may or must work remotely 100% of the time (from home or another location of their choosing).',
			'smartcrawl-seo'
		),
		customSources: {
			options: {
				label: __('Job Location Type', 'smartcrawl-seo'),
				values: {
					'': __('Default', 'smartcrawl-seo'),
					TELECOMMUTE: __('Telecommute', 'smartcrawl-seo'),
				},
			},
		},
	},
	educationRequirements: {
		id: id(),
		type: 'EducationalOccupationalCredential',
		label: __('Education Level', 'smartcrawl-seo'),
		flatten: true,
		properties: {
			credentialCategory: {
				id: id(),
				label: __('Education Level', 'smartcrawl-seo'),
				type: 'Text',
				source: 'options',
				value: '',
				description: __(
					"The level of education that's required for the job posting.",
					'smartcrawl-seo'
				),
				customSources: {
					options: {
						label: __('Education Level', 'smartcrawl-seo'),
						values: {
							'': __('No requirements', 'smartcrawl-seo'),
							'high school': __('High School', 'smartcrawl-seo'),
							'associate degree': __(
								'Associate Degree',
								'smartcrawl-seo'
							),
							'bachelor degree': __(
								'Bachelor Degree',
								'smartcrawl-seo'
							),
							'professional certificate': __(
								'Professional Certificate',
								'smartcrawl-seo'
							),
							'postgraduate degree': __(
								'Postgraduate degree',
								'smartcrawl-seo'
							),
						},
					},
				},
			},
		},
	},
	experienceRequirements: {
		id: id(),
		type: 'OccupationalExperienceRequirements',
		label: __('Months Of Experience', 'smartcrawl-seo'),
		flatten: true,
		properties: {
			monthsOfExperience: {
				id: id(),
				label: __('Months Of Experience', 'smartcrawl-seo'),
				type: 'Number',
				source: 'number',
				value: '',
				description: __(
					'The minimum number of months of experience that are required for the job posting. If there are more complex experience requirements, use the experience that represents the minimum number that is required for a candidate.',
					'smartcrawl-seo'
				),
			},
		},
	},
	experienceInPlaceOfEducation: {
		id: id(),
		label: __('Experience In Place Of Education', 'smartcrawl-seo'),
		type: 'Text',
		source: 'options',
		value: 'False',
		description: __(
			'If set to true, this property indicates whether a job posting will accept experience in place of its formal educational qualifications. If set to true, you must include both the experienceRequirements and educationRequirements properties.',
			'smartcrawl-seo'
		),
		customSources: {
			options: {
				label: __('Boolean Value', 'smartcrawl-seo'),
				values: {
					False: __('False', 'smartcrawl-seo'),
					True: __('True', 'smartcrawl-seo'),
				},
			},
		},
	},
	hiringOrganization: {
		id: id(),
		label: __('Hiring Organization', 'smartcrawl-seo'),
		type: 'Organization',
		required: true,
		description: __(
			'The organization offering the job position. This should be the name of the company (for example, "Starbucks, Inc"), and not the specific location that is hiring (for example, "Starbucks on Main Street").',
			'smartcrawl-seo'
		),
		properties: JobHiringOrganization,
	},
	jobLocation: {
		id: id(),
		label: __('Job Locations', 'smartcrawl-seo'),
		labelSingle: __('Job Location', 'smartcrawl-seo'),
		required: true,
		description: __(
			'The physical location(s) of the business where the employee will report to work (such as an office or worksite), not the location where the job was posted. Include as many properties as possible. The more properties you provide, the higher quality the job posting is to the users.',
			'smartcrawl-seo'
		),
		properties: {
			0: {
				id: id(),
				type: 'Place',
				properties: JobPlace,
			},
		},
	},
	applicantLocationRequirements: {
		id: id(),
		label: __('Applicant Location Requirements', 'smartcrawl-seo'),
		labelSingle: __('Applicant Location Requirement', 'smartcrawl-seo'),
		description: __(
			'The geographic location(s) in which employees may be located for to be eligible for the Work from home job. This property is only recommended if applicants may be located in one or more geographic locations and the job may or must be 100% remote.',
			'smartcrawl-seo'
		),
		properties: {
			0: {
				id: id(),
				properties: JobApplicantLocationRequirement,
			},
		},
	},
	baseSalary: {
		id: id(),
		label: __('Base Salary', 'smartcrawl-seo'),
		type: 'MonetaryAmount',
		description: __(
			'The actual base salary for the job, as provided by the employer (not an estimate).',
			'smartcrawl-seo'
		),
		disallowAddition: true,
		properties: JobSalaryMonetaryAmount,
	},
	identifier: {
		id: id(),
		label: __('Identifier', 'smartcrawl-seo'),
		type: 'PropertyValue',
		description: __(
			"The hiring organization's unique identifier for the job.",
			'smartcrawl-seo'
		),
		disallowAddition: true,
		properties: {
			name: {
				id: id(),
				label: __('Name', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				description: __('The identifier name.', 'smartcrawl-seo'),
				disallowDeletion: true,
			},
			value: {
				id: id(),
				label: __('Value', 'smartcrawl-seo'),
				type: 'Text',
				source: 'custom_text',
				value: '',
				description: __('The identifier value.', 'smartcrawl-seo'),
				disallowDeletion: true,
			},
		},
	},
};
export default JobPosting;
