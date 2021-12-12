import * as dotenv from 'dotenv';
import { app } from './server';

dotenv.config({
  path: __dirname + '/../.env',
});
const port: number = parseInt('' + process.env.PORT) || 8082;

app.listen(port, () => {
  console.log('Redspace challenge; ctrl+click http://127.0.0.1:' + port);
});