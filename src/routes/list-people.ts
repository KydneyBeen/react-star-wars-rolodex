import * as dotenv from 'dotenv';
import { apiRequest } from './utils/apiRequest';
import { EventEmitter } from 'events';
import { Batch, People, Person } from './utils/types';
import { Resource } from './utils/enums';

dotenv.config({
  path: __dirname + '/../../.env',
});

// global variable to store list in memory after first load
const fullList: Array<People> = [];

const getPeopleFromBatch = (results: Batch): Array<People> => {
  const people: Array<People> = [];
  if (results && results.results) {
    results.results.forEach((person: Person): void => {
      const id: number = parseInt(person.url.match(/[0-9]+/g)[0]);
      people.push({
        id,
        name: person.name,
      });
    });
  }
  return people;
};

const getPeopleRecursively = async (query: string, apiResponse: EventEmitter): Promise<void> => {
  const pathPart: string = query === '' ? query : '?page=' + query;
  const batch: Batch = await apiRequest(Resource.people, pathPart);
  if (batch) {
    const people: Array<People> = getPeopleFromBatch(batch);
    apiResponse.emit('data', people);
    if (batch.next) {
      const nextPath = new URL(batch.next);
      await getPeopleRecursively(nextPath.searchParams.get('page'), apiResponse);
    } else {
      apiResponse.emit('end');
    }
  } else {
    apiResponse.emit('error', 'Error getting people list');
  }
};

const listPeople = async (req: any, res: any): Promise<void> => {
  if (fullList && fullList.length >= 1) {
    res.statusCode = 200;
    res.send(JSON.stringify(fullList));
  } else {
    const apiResponse = new EventEmitter();
    apiResponse.on('data', (data: Array<People>) => {
      fullList.push(...data);
    });
    apiResponse.on('error', (err: string) => {
      res.statusCode = 500;
      res.statusMessage = err;
      res.send();
    });
    apiResponse.on('end', () => {
      res.statusCode = 200;
      res.send(JSON.stringify(fullList));
    });
    await getPeopleRecursively('', apiResponse);
  }
};

export default listPeople;
