import * as https from 'https';
import * as dotenv from 'dotenv';
import { Resource } from '../../utils/enums';

dotenv.config({
  path: __dirname + '/../../.env',
});

// calls swapi api and returns the raw results
const apiRequest = (resource: Resource, pathPart: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: process.env.APIHOST,
      path: `${process.env.APIPATH}/${resource}/${pathPart}`,
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
        if (response.statusCode === 200) {
          resolve(JSON.parse(results));
        } else {
          resolve(null);
        }
      });
    });
    request.on('error', (err: Error) => {
      console.error(err);
      resolve(null);
    });
    request.end();
  });
};

export { apiRequest };
