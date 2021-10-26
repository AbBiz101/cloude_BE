import { body } from 'express-validator';
export const blogValidator = [
	body('title').exists().withMessage('title is mandatory field.'),
	body('category').exists().withMessage('category is mandatory field.'),
];
