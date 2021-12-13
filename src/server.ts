import * as express from 'express';
import * as morgan from 'morgan';
import router from './router';

export const app = express();

// trust proxy for correct logging behind a proxy
app.set('trust proxy', 'loopback');

// logging
app.use(morgan('combined'));

// api endpoints
app.use(router);

// serve static resources
app.use(
  express.static(__dirname + '/../dist/public/', {
    extensions: ['html'],
    index: 'index.html',
  }),
);

// redirect to index any request that falls through this far
app.use((req, res, next) => {
  res.redirect('/');
});
