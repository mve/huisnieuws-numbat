import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import env from '../../src/helpers/env';
import mapRouter from '../../src/routes/map-route';

const app = express();
const TEST_ATLAS_URI = env('TEST_ATLAS_URI');

app.use(express.json());

jest.setTimeout(35000);

mongoose.connect(TEST_ATLAS_URI);

app.use('/maps', mapRouter);

describe('Map routes', () => {
  test('GET /maps', async () => {
    const { header, status, body } = await request(app)
      .get('/maps')
      .query({ zipcode: '3905HK' });

    expect(header['content-type']).toBe('application/json; charset=utf-8');
    expect(status).toBe(200);
    expect(typeof body.place_id).toBe('number');
    expect(typeof body.licence).toBe('string');
    expect(typeof body.boundingbox).toBe('object');
    expect(typeof body.lat).toBe('string');
    expect(typeof body.lon).toBe('string');
    expect(typeof body.display_name).toBe('string');
    expect(typeof body.place_rank).toBe('number');
    expect(typeof body.category).toBe('string');
    expect(typeof body.type).toBe('string');
    expect(typeof body.importance).toBe('number');
  });

  test('GET /maps with non existing zipcode', async () => {
    const { status } = await request(app)
      .get('/maps')
      .query({ zipcode: '1111ZZ' });

    expect(status).toBe(400);
  });
});
