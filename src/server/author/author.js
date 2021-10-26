import multer from 'multer';
import uniqid from 'uniqid';
import express from 'express';
import createHttpError from 'http-errors';
import { authorValidator } from '../author/validator.js';
import { validationResult } from 'express-validator';
import { getAuthor, writeAuthor, authorImag } from '../../fs-tools.js';

const authorsRounter = express.Router();

authorsRounter.post('/', authorValidator, async (req, res, next) => {
	try {
		const errorsList = validationResult(req);
		if (!errorsList.isEmpty()) {
			next(createHttpError(400, { errorsList }));
		} else {
			const author = await getAuthor();
			const newAuthor = {
				...req.body,
				createdAt: new Date(),
				id: uniqid(),
			};
			author.push(newAuthor);
			await writeAuthor(author);
			res.status(201).send('Post created');
		}
	} catch (error) {
		next(error);
	}
});
authorsRounter.post(
	'/:id/coverimg',
	multer().single('profilePic'),
	async (req, res, next) => {
		try {
			await authorImag(req.file.originalname, req.file.buffer);
			res.send('ok');
		} catch (error) {
			next(error);
		}
	},
);
authorsRounter.get('/', async (req, res, next) => {
	try {
		const author = await getAuthor();
		res.send(author);
	} catch (error) {
		next(error);
	}
});
authorsRounter.get('/:id', async (req, res, next) => {
	try {
		const author = await getAuthor();
		const singleAuthor = author.find((p) => p.id === req.params.id);
		res.send(singleAuthor);
	} catch (error) {
		next(error);
	}
});
authorsRounter.put('/:id', async (req, res, next) => {
	try {
		const author = await getAuthor();
		const authorIndex = author.findIndex((p) => p.id === req.params.id);
		const editedAuthor = { ...author[authorIndex], ...req.body };
		author[authorIndex] = editedAuthor;
		await writeAuthor(author);
		res.send(editedAuthor);
		88
	} catch (error) {
		next(error);
	}
});
authorsRounter.delete('/:id', async (req, res, next) => {
	try {
		const author = await getAuthor();
		const filterdAuthor = author.filter((p) => p.id !== req.params.id);
		await writeAuthor(filterdAuthor);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});
export default authorsRounter;
