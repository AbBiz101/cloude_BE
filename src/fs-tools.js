import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON, writeFile } = fs;

const blogpostJSON = join(
	dirname(fileURLToPath(import.meta.url)),
	'./server/data/blogpost.json',
);
const authorJSON = join(
	dirname(fileURLToPath(import.meta.url)),
	'./server/data/author.json',
);

export const getPost = () => readJSON(blogpostJSON);
export const writePost = (post) => writeJSON(blogpostJSON,post);

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


