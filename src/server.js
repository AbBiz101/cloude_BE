import cors from 'cors';
import express from 'express';
import Endpoints from 'express-list-endpoints';
import blogpostRounter from './server/post/blogpost.js';
import authorsRounter from './server/author/author.js';
import {
	badRequestHandler,
	unAuterizedHandler,
	notFoundHandler,
	genericErrorHandler,
} from './errorHandler.js';

const server = express();

const whiteList = [process.env.FE_LOCAL_URL, process.env.FE_PROD_URL];
const corsOpts = {
	origin: function (origin, next) {
		console.log('current origin:',origin);
		if (!origin || whiteList.indexOf(origin) !== -1) {
			next(null, true);
		} else {
			next(new Error(404, 'CORS ERROR'));
		}
	},
};
server.use(cors(corsOpts));
server.use(express.json());

server.use('/blogPosts', blogpostRounter);
server.use('/authors', authorsRounter);

server.use(badRequestHandler);
server.use(unAuterizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

const port = process.env.PORT;

console.table(Endpoints(server));
server.listen(port, () => {
	console.log('server running-', port);
});
