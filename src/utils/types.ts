import { Gender } from './enums';

// The api response from swapi for a list
export interface Batch {
  count: number;
  next?: string;
  previous?: string;
  results: Array<Person>;
}

// The desired format of each film in a person object
export interface Film {
  title: string;
  director: string;
  producer: string;
  release_date: string;
}

// The desired format of each person in a list of people
export interface People {
  id: number;
  name: string;
}

// The api response from swapi for one person
export interface Person {
  name?: string;
  displayName?: string;
  birth_year: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  gender: Gender;
  homeworld: string;
  films: string[];
  species: string[];
  url?: string;
}

// The desired format of one person
export interface PersonDetail extends Omit<Person, 'species' | 'films' | 'homeworld'> {
  species: Array<Species>;
  films: Array<Film>;
  homeworld: Planet;
}

// The desired format of each planet in a person object
export interface Planet {
  name: string;
  terrain: string;
  population: string;
}

// The desired format of each species in a person object
export interface Species {
  name: string;
  average_lifespan: string;
  classification: string;
  language: string;
}
