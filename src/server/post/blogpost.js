import multer from 'multer';
import uniqid from 'uniqid';
import express from 'express';
import createHttpError from 'http-errors';
import { blogValidator } from '../post/validation.js';
import { validationResult } from 'express-validator';
import { getPost, writePost, blogImag, postStream } from '../../fs-tools.js';
import { pdfReadableStream } from './postPDF.js';
import { pipeline } from 'stream';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinaryStorage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'blog-post',
	},
});

const blogpostRounter = express.Router();

blogpostRounter.post(
	'/:id/coverimg',
	multer({ storage: cloudinaryStorage }).single('profilePic'),
	async (req, res, next) => {
		try {
			await blogImag(req.file.originalname, req.file.buffer);
			res.send('ok');
		} catch (error) {
			next(error);
		}
	},
);
blogpostRounter.post('/', blogValidator, async (req, res, next) => {
	try {
		const errorsList = validationResult(req);
		if (!errorsList.isEmpty()) {
			next(createHttpError(400, { errorsList }));
		} else {
			const post = await getPost();
			const newPost = { ...req.body, createdAt: new Date(), id: uniqid() };
			post.push(newPost);
			await writePost(post);
			res.status(201).send('Post created');
		}
	} catch (error) {
		next(error);
	}
});

blogpostRounter.get('/', async (req, res, next) => {
	try {
		const post = await getPost();
		res.send(post);
	} catch (error) {
		next(error);
	}
});

blogpostRounter.get('/:postID', async (req, res, next) => {
	try {
		const post = await getPost();
		const singlePost = post.find((p) => p.id === req.params.postID);
		res.send(singlePost);
	} catch (error) {
		next(error);
	}
});

blogpostRounter.put('/:postID', async (req, res, next) => {
	try {
		const post = await getPost();
		const postIndex = post.findIndex((p) => p.id === req.params.postID);
		const editedPost = { ...post[postIndex], ...req.body };
		post[postIndex] = editedPost;
		await writePost(post);
		res.send(editedPost);
	} catch (error) {
		next(error);
	}
});

blogpostRounter.delete('/:postID', async (req, res, next) => {
	try {
		const post = await getPost();
		const filterdPost = post.filter((p) => p.id !== req.params.postID);
		console.log(req.params.postID);
		await writePost(filterdPost);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

blogpostRounter.get('/:id/downloadPDF', (req, res, next) => {
	try {
		res.setHeader('Content-Disposition', 'attachment; filename=blogpost.pdf');
		const source = pdfReadableStream({ firstName: 'blogpost' });
		const destination = res;
		console.error('req send');
		pipeline(source, destination, (err) => {
			if (err) {
				next(err);
			}
		});
	} catch (error) {
		console.error('req send');
		next(error);
	}
});

export default blogpostRounter;
