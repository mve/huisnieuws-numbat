import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import env from '../../src/helpers/env';
import userRouter from '../../src/routes/user-route';

const app = express();
const TEST_ATLAS_URI = env('TEST_ATLAS_URI');

app.use(express.json());

jest.setTimeout(35000);

mongoose.connect(TEST_ATLAS_URI);

app.use('/users', userRouter);

describe('Users routes', () => {
  test('GET /users', async () => {
    const { header, status, body } = await request(app)
      .get('/users')
      .query({ email: 'nielsbosman333@gmail.com' });

    expect(header['content-type']).toBe('application/json; charset=utf-8');
    expect(status).toBe(200);
    expect(typeof body.name).toBe('string');
    expect(typeof body.email).toBe('string');
    expect(typeof body.imageUrl).toBe('string');
    expect(typeof body.role).toBe('string');
  });

  test('POST /users', async () => {
    const { status, header, body } = await request(app)
      .post('/users')
      .send({
        _id: '61ae24d503137806db7822fc',
        name: 'Testgebruiker',
        email: 'email@mail.com',
        imageUrl: 'https://lh3.googleusercontent.com/a/AATXAJxIDaCdxHHApl4KdGO_QMqUvNb2tVBVVONMQTQc=s96-c',
        role: 'poster',
      });

    expect(status).toBe(201);
    expect(header['content-type']).toBe('application/json; charset=utf-8');
    expect(typeof body.name).toBe('string');
    expect(typeof body.email).toBe('string');
    expect(typeof body.imageUrl).toBe('string');
    expect(typeof body.role).toBe('string');
  });

  test('GET /users/:id/articles', async () => {
    const { status, body } = await request(app)
      .get('/users/619e02dfea5f6b543eed91ec/articles');

    expect(status).toBe(200);

    expect(typeof body[0].title).toBe('string');
    expect(typeof body[0].zipcode).toBe('string');
    expect(typeof body[0].text).toBe('string');
    expect(typeof body[0].image).toBe('string');
    expect(typeof body[0].author).toBe('string');
  });
});
