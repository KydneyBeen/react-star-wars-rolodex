import { Gender } from './enums';

export interface Person {
  name?: string;
  displayName?: string;
  birth_year: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  gender: Gender;
  homeworld: string | Planet;
  films: string[] | Array<Film>;
  species: string[] | Array<Species>;
  url?: string;
}

export interface PersonDetail extends Person {
  species: Array<Species>;
  films: Array<Film>;
  homeworld: Planet;
}

export interface Planet {
  name: string;
  terrain: string;
  population: string;
}

export interface Species {
  name: string;
  average_lifespan: string;
  classification: string;
  language: string;
}

export interface Film {
  title: string;
  director: string;
  producer: string;
  release_date: string;
}

export interface People {
  id: number;
  name: string;
}

export interface Batch {
  count: number;
  next?: string;
  previous?: string;
  results: Array<Person>;
}
