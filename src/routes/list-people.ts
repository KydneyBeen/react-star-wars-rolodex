import * as dotenv from 'dotenv';
import { apiRequest } from './utils/apiRequest';
import { EventEmitter } from 'events';
import { Batch, People, Person } from '../utils/types';
import { Resource } from '../utils/enums';

dotenv.config({
  path: __dirname + '/../../.env',
});

// global variable to cache list in memory after first load
const fullList: Array<People> = [];

// generates an array of people from swapi api results
const getPeopleFromBatch = (results: Batch): Array<People> => {
  const people: Array<People> = [];
  if (results && results.results) {
    const peopleArr: Array<Person> = results.results;
    peopleArr.forEach((person: Person): void => {
      if (person.url && person.name) {
        const parsedUrl: RegExpMatchArray | null = person.url.match(/[0-9]+/g);
        const id: number = parseInt(parsedUrl ? parsedUrl[parsedUrl.length - 1] : '0');
        people.push({
          id,
          name: person.name,
        });
      }
    });
  }
  return people;
};

// gets a list of people from the swapi api and returns them via event emitter
// the swapi api paginates this list, so this function recursively gets all pages
const getPeopleRecursively = async (query: string, apiResponse: EventEmitter): Promise<void> => {
  const pathPart: string = query === '' ? query : '?page=' + query;
  const batch: Batch = await apiRequest(Resource.people, pathPart);
  if (batch) {
    const people: Array<People> = getPeopleFromBatch(batch);
    apiResponse.emit('data', people);
    if (batch.next) {
      const nextPath = new URL(batch.next);
      await getPeopleRecursively(nextPath.searchParams.get('page') || '', apiResponse);
    } else {
      apiResponse.emit('end');
    }
  } else {
    apiResponse.emit('error', 'Error getting people list');
  }
};

// enpoint /list
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
      fullList.sort((a: People, b: People) => {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
      res.send(JSON.stringify(fullList));
    });
    await getPeopleRecursively('', apiResponse);
  }
};

export default listPeople;
