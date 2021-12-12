const request = require('supertest');
const server = require('../dist/server.js');
const darthVaderId = "4";

describe('GET /person/4', () => {
  it('should return details of Darth Vader', async() => {
    const res = await request(server.app)
    .get(`/person/${darthVaderId}`);
    const body = JSON.parse(res.text);
    expect(res.statusCode).toEqual(200);
    expect(body).toHaveProperty('name');
    expect(body.name).toEqual('Darth Vader');
    expect(body).toHaveProperty('birth_year');
    expect(body.birth_year).toEqual('41.9BBY');
    expect(body).toHaveProperty('height');
    expect(body.height).toEqual('202');
    expect(body).toHaveProperty('mass');
    expect(body.mass).toEqual('136');
    expect(body).toHaveProperty('hair_color');
    expect(body.hair_color).toEqual('none');
    expect(body).toHaveProperty('skin_color');
    expect(body.skin_color).toEqual('white');
    expect(body).toHaveProperty('gender');
    expect(body.gender).toEqual('male');
    expect(body).toHaveProperty('homeworld');
    expect(body.homeworld).toHaveProperty('name');
    expect(body.homeworld).toHaveProperty('terrain');
    expect(body.homeworld).toHaveProperty('population');
    expect(body).toHaveProperty('films');
    expect(body.films.length).toBeGreaterThanOrEqual(0);
    body.films.forEach((film) => {
      expect(film).toHaveProperty('title');
      expect(typeof film.title).toEqual('string');
      expect(film).toHaveProperty('release_date');
      expect(film.release_date).toMatch(/^[1-2]{1}[0-9]{3}-[0-1]{1}[0-9]{1}-[0-3]{0,1}[0-9]{1}$/gm);
      expect(film).toHaveProperty('producer');
      expect(typeof film.producer).toEqual('string');
      expect(film).toHaveProperty('director');
      expect(typeof film.director).toEqual('string');
    })
    expect(body).toHaveProperty('species');
    expect(body.species.length).toBeGreaterThanOrEqual(0);
    body.species.forEach((species) => {
      expect(species).toHaveProperty('name');
      expect(typeof species.name).toEqual('string');
      expect(species).toHaveProperty('average_lifespan');
      expect(typeof species.average_lifespan).toEqual('string');
      expect(species).toHaveProperty('classification');
      expect(typeof species.classification).toEqual('string');
      expect(species).toHaveProperty('language');
      expect(typeof species.language).toEqual('string');
    })
  })
});