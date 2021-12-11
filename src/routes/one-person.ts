import * as dotenv from 'dotenv';
import { apiRequest } from './utils/apiRequest';
import { Film, Person, PersonDetail, Planet, Species } from './utils/types';
import { Resource } from './utils/enums';
import { PersonResult } from './utils/classes';

dotenv.config({
  path: __dirname + '/../.env',
});

const getPersonDetail = async (pathPart: string): Promise<PersonDetail | null> => {
  const person: Person = await apiRequest(Resource.people, pathPart);
  const personSpecies: Array<Species> = [];
  const personFilms: Array<Film> = [];
  let personHomeworld: Planet | null;
  if (person && person.species) {
    await Promise.all(
      person.species.map(async (species) => {
        if (species && typeof species === 'string') {
          const parsedUrl = species.match(/[0-9]+/g);
          const id: string = parsedUrl ? parsedUrl[0] : '0';
          const speciesObj: Species = await apiRequest(Resource.species, id);
          personSpecies.push(speciesObj);
        }
      }),
    );
  } else {
    return null;
  }
  if (person && person.films) {
    await Promise.all(
      person.films.map(async (film) => {
        if (film && typeof film === 'string') {
          const parsedUrl = film.match(/[0-9]+/g);
          const id: string = parsedUrl ? parsedUrl[0] : '0';
          const filmObj: Film = await apiRequest(Resource.films, id);
          personFilms.push(filmObj);
        }
      }),
    );
  } else {
    return null;
  }
  if (person && person.homeworld && typeof person.homeworld === 'string') {
    const parsedUrl = person.homeworld.match(/[0-9]+/g);
    const id: string = parsedUrl ? parsedUrl[0] : '0';
    const planetObj: Planet = await apiRequest(Resource.planets, id);
    personHomeworld = planetObj;
  } else {
    personHomeworld = null;
    return null;
  }
  const personDetail: PersonDetail = new PersonResult({
    ...person,
    species: personSpecies,
    films: personFilms,
    homeworld: personHomeworld,
  });
  return personDetail;
};

const onePerson = async (req: any, res: any, next: VoidFunction): Promise<void> => {
  const pathPart: string = req.params.person || '1';
  const personDetail: PersonDetail | null = await getPersonDetail(pathPart);
  if (personDetail) {
    res.statusCode = 200;
    res.send(JSON.stringify(personDetail));
  } else {
    res.statusCode = 500;
    res.statusMessage = 'Error getting person details';
    res.send();
  }
};

export default onePerson;
