import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import articleRouter from '../../src/routes/article-route';
import env from '../../src/helpers/env';

const app = express();
const TEST_ATLAS_URI = env('TEST_ATLAS_URI');

app.use(express.json());

jest.setTimeout(35000);

mongoose.connect(TEST_ATLAS_URI);

app.use('/articles', articleRouter);

describe('Good Article Routes', () => {
  test('GET /articles', async () => {
    const { header, status, body } = await request(app).get('/articles');
    expect(header['content-type']).toBe('application/json; charset=utf-8');
    expect(status).toBe(200);

    expect(typeof body[0].title).toBe('string');
    expect(typeof body[0].zipcode).toBe('string');
    expect(typeof body[0].text).toBe('string');
    expect(typeof body[0].image).toBe('string');
    expect(typeof body[0].author).toBe('string');
  });

  test('POST /articles', async () => {
    const { status, header, body } = await request(app)
      .post('/articles')
      .set('userid', '61af2f888a28c74f146c95a2')
      .send({
        title: 'Dit is de titel',
        text: 'Dit is de tekst',
        zipcode: '6711NG',
        image: 1,
        author: '61af2f888a28c74f146c95a2',
      });

    expect(status).toBe(201);
    expect(header['content-type']).toBe('application/json; charset=utf-8');
    expect(typeof body.title).toBe('string');
    expect(typeof body.zipcode).toBe('string');
    expect(typeof body.text).toBe('string');
    expect(typeof body.image).toBe('string');
    expect(typeof body.author).toBe('string');
  });

  test('POST /articles with wrong zipcode', async () => {
    const { status } = await request(app)
      .post('/articles')
      .set('userid', '61af2f888a28c74f146c95a2')
      .send({
        title: 'Dit is de titel',
        text: 'Dit is de tekst',
        zipcode: '1234AA',
        image: 1,
        author: '61af2f888a28c74f146c95a2',
      });

    expect(status).toBe(400);
  });

  test('POST /articles with wrong role', async () => {
    const { status } = await request(app)
      .post('/articles')
      .set('userid', '61bd1be4105ecbab1e1d44c9')
      .send({
        title: 'Dit is de titel',
        text: 'Dit is de tekst',
        zipcode: '6711NG',
        image: 1,
        author: '61bd1be4105ecbab1e1d44c9',
      });

    expect(status).toBe(400);
  });

  test('PUT /articles', async () => {
    const { status, header, body } = await request(app)
      .put('/articles/61b0d685e3444f0b629600d7')
      .set('userid', '61af2f888a28c74f146c95a2')
      .send({
        title: 'Dit is de titel',
        text: 'Dit is de tekst',
        zipcode: '6711NG',
        image: 1,
        author: '61af2f888a28c74f146c95a2',
      });

    expect(status).toBe(200);
    expect(header['content-type']).toBe('application/json; charset=utf-8');
    expect(typeof body.title).toBe('string');
    expect(typeof body.zipcode).toBe('string');
    expect(typeof body.text).toBe('string');
    expect(typeof body.image).toBe('string');
    expect(typeof body.author).toBe('string');
  });

  test('PUT /articles with wrong zipcode', async () => {
    const { status } = await request(app)
      .put('/articles/61b0d685e3444f0b629600d7')
      .set('userid', '61af2f888a28c74f146c95a2')
      .send({
        title: 'Dit is de titel',
        text: 'Dit is de tekst',
        zipcode: '1234AA',
        image: 1,
        author: '61af2f888a28c74f146c95a2',
      });

    expect(status).toBe(400);
  });

  test('PUT /articles with wrong role', async () => {
    const { status } = await request(app)
      .put('/articles/61b0d685e3444f0b629600d7')
      .set('userid', '61b08dd7f8f7bb51a63a392c')
      .send({
        title: 'Dit is de titel',
        text: 'Dit is de tekst',
        zipcode: '6711NG',
        image: 1,
        author: '61b08dd7f8f7bb51a63a392c',
      });

    expect(status).toBe(400);
  });

  test('POST /articles/:id/comments', async () => {
    const { status, body } = await request(app)
      .post('/articles/61b31bf2e9ba6c23c3937cf4/comments')
      .set('userid', '619e02dfea5f6b543eed91ed')
      .send({
        comment: "Nieuwe comment",
      });

    expect(status).toBe(200);
    expect(typeof body.comments[body.comments.length-1]).toBe('object');
    expect(body.comments[body.comments.length-1].comment).toEqual('Nieuwe comment');
    expect(body.comments[body.comments.length-1].commenter).toEqual('619e02dfea5f6b543eed91ed');
  });

  test('GET /articles/:id', async () => {
    const { status, header, body } = await request(app).get('/articles/61ae188cfb382560347f8ab7');

    expect(status).toBe(200);
    expect(header['content-type']).toBe('application/json; charset=utf-8');

    expect(typeof body.title).toBe('string');
    expect(typeof body.zipcode).toBe('string');
    expect(typeof body.text).toBe('string');
    expect(typeof body.image).toBe('string');
    expect(typeof body.author).toBe('string');
  });

  test('DELETE /articles/:id as admin', async () => {
    const { status } = await request(app).delete('/articles/61ae188cfb382560347f8ab7')
      .set('userid', '619e02dfea5f6b543eed91ec');

    expect(status).toBe(200);
  });
});
