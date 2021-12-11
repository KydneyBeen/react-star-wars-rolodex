import * as express from 'express';
import * as morgan from 'morgan';
import router from './router/router';

const app = express();
const port: number = parseInt('' + process.env.PORT) || 8082;

app.set('trustproxy', 'loopback');

app.use(morgan('combined'));

app.use(router);

app.use(
  express.static(__dirname + '/../dist/public/', {
    extensions: ['html'],
    index: 'index.html',
  }),
);

app.listen(port, () => {
  console.log('Redspace challenge; ctrl+click http://127.0.0.1:' + port);
});
