import { Film, PersonDetail, Planet, Species } from './types';

export class FilmResult {
  title: string;
  director: string;
  producer: string;
  release_date: string;

  constructor(results: Film) {
    this.title = results.title;
    this.director = results.director;
    this.producer = results.producer;
    this.release_date = results.release_date;
  }
}

export class PersonResult {
  name: PersonDetail['name'];
  birth_year: PersonDetail['birth_year'];
  height: PersonDetail['height'];
  mass: PersonDetail['mass'];
  hair_color: PersonDetail['hair_color'];
  skin_color: PersonDetail['skin_color'];
  gender: PersonDetail['gender'];
  homeworld: PersonDetail['homeworld'];
  films: PersonDetail['films'] = [];
  species: PersonDetail['species'] = [];

  constructor(results: PersonDetail) {
    this.name = results.name;
    this.birth_year = results.birth_year;
    this.height = results.height;
    this.mass = results.mass;
    this.hair_color = results.hair_color;
    this.skin_color = results.skin_color;
    this.gender = results.gender;
    this.homeworld = new PlanetResult(results.homeworld);
    results.species.forEach((species) => {
      if (species) {
        const speciesResult = new SpeciesResult(species);
        this.species.push(speciesResult)
      }
    });
    results.films.forEach((film) => {
      if (film) {
        const filmResult = new FilmResult(film);
        this.films.push(filmResult)
      }
    });
  }
}

export class PlanetResult {
  name: string;
  terrain: string;
  population: string;

  constructor(results: Planet) {
    this.name = results.name;
    this.terrain = results.terrain;
    this.population = results.population;
  }
}

export class SpeciesResult {
  name: string;
  average_lifespan: string;
  classification: string;
  language: string;

  constructor(results: Species) {
    this.name = results.name;
    this.average_lifespan = results.average_lifespan;
    this.classification = results.classification;
    this.language = results.language;
  }
}
