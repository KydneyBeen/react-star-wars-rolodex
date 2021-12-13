const request = require('supertest');
const server = require('../dist/server.js');

describe('GET /list', () => {
  jest.setTimeout(15000);
  it('should return a list of characters', async () => {
    const res = await request(server.app).get('/list');
    const body = JSON.parse(res.text);
    expect(res.statusCode).toEqual(200);
    expect(body.length).toBeGreaterThanOrEqual(0);
    body.forEach((person) => {
      expect(person).toHaveProperty('id');
      expect(person.id).toBeGreaterThanOrEqual(0);
      expect(person).toHaveProperty('name');
      expect(typeof person.name).toEqual('string');
    });
  });
});
