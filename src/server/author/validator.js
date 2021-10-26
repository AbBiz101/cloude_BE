import { body } from 'express-validator';
export const authorValidator = [
	body('name').exists().withMessage('name is mandatory field.'),
	body('surname').exists().withMessage('category is mandatory field.'),
	body('email').exists().withMessage('email is mandatory field.'),
	body('date of birth')
		.exists()
		.withMessage('date of birth is mandatory field.'),
	// body('avatar').exists().withMessage('avatar is mandatory field.'),
];
