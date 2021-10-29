import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sgMail from '@sendgrid/mail';

const { readJSON, writeJSON, writeFile, createReadStream } = fs;

const blogpostJSON = join(
	dirname(fileURLToPath(import.meta.url)),
	'./server/data/blogpost.json',
);
const authorJSON = join(
	dirname(fileURLToPath(import.meta.url)),
	'./server/data/author.json',
);

export const getPost = () => readJSON(blogpostJSON);
export const writePost = (post) => writeJSON(blogpostJSON, post);

export const getAuthor = () => readJSON(authorJSON);
export const writeAuthor = (post) => writeJSON(authorJSON, post);

const bookImgFolder = join(process.cwd(), './public/author');
export const blogImag = (filename, buffer) => {
	writeFile(join(bookImgFolder, filename), buffer);
};

const authorImgFolder = join(process.cwd(), './public/post');
export const authorImag = (filename, buffer) => {
	writeFile(join(authorImgFolder, filename), buffer);
};

export const postStream = () => createReadStream(blogpostJSON);

sgMail.setApiKey(process.env.SENDGRID_KEY); // Do not forget this and double check that process.env.SENDGRID_KEY is NOT undefined

export const sendRegistrationEmail = async (recipientAddress) => {
	const msg = {
		to: recipientAddress,
		from: process.env.SENDER_EMAIL,
		subject: 'Sending with Twilio SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	};
	await sgMail.send(msg);
};

// https://github.com/LorenzoGiorgini/M5-D7-HerokuApp-BE
