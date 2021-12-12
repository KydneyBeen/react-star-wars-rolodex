import * as express from 'express';
import * as morgan from 'morgan';
import router from './router/router';

export const app = express();

app.set('trust proxy', 'loopback');

app.use(morgan('combined'));

app.use(router);

app.use(
  express.static(__dirname + '/../dist/public/', {
    extensions: ['html'],
    index: 'index.html',
  }),
);
