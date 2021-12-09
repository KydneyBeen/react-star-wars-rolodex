import * as https from 'https';
import * as dotenv from 'dotenv';

dotenv.config({
  path: __dirname + '/../../.env',
});

const listPeople = (req:any, res:any , next: VoidFunction): void => {
  const options:https.RequestOptions = {
    hostname: process.env.APIHOST,
    path: `${process.env.APIPATH}/people/`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const request = https.request(options, (response) => {
    let people = '';
    response.on('data', (chunk:string) => {
      people += chunk;
    });
    response.on('end', () => {
      res.send(JSON.stringify(people))
    })
  });
  request.on('error', (err:Error) => {
    res.statusCode = 500;
    res.statusMessage = "Error getting people list";
    res.send();
  });
  request.end();
};

export default listPeople;
