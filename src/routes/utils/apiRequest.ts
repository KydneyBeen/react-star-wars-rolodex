import * as https from 'https';
import * as dotenv from 'dotenv';
import { Resource } from './enums';

dotenv.config({
  path: __dirname + '/../../.env',
});

const apiRequest = (resouce: Resource, pathPart: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: process.env.APIHOST,
      path: `${process.env.APIPATH}/${resouce}/${pathPart}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const request = https.request(options, (response) => {
      let results = '';
      response.on('data', (chunk: string) => {
        results += chunk;
      });
      response.on('end', () => {
        resolve(JSON.parse(results));
      });
    });
    request.on('error', (err: Error) => {
      resolve(null);
    });
    request.end();
  });
};

export { apiRequest };
