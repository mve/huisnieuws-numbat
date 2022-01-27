import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import env from '../../src/helpers/env';
import { roleQueueRouter } from "../../src/routes/role-queue-route";

const app = express();
const TEST_ATLAS_URI = env('TEST_ATLAS_URI');

app.use(express.json());

jest.setTimeout(35000);

mongoose.connect(TEST_ATLAS_URI);

app.use('/role-queue', roleQueueRouter);

describe('Good Role Queue Routes', () => {
  test('PUT /role-queue as admin', async () => {
    const { status } = await request(app)
      .put('/role-queue/61c1d52f0452cd5699ddfbf2')
      .set('userid', '619e02dfea5f6b543eed91ec');

    expect(status).toBe(200);
  });

  test('DELETE /role-queue as admin', async () => {
    const { status } = await request(app)
      .delete('/role-queue/61c1d5363fe7d70a0c4b6d54')
      .set('userid', '619e02dfea5f6b543eed91ec');

    expect(status).toBe(200);
  });

  
  test('POST /role-queue', async () => {
    const { status, header, body } = await request(app)
      .post('/role-queue')
      .set('userid', '61bd1be4105ecbab1e1d44c9')
      .send({
        userId: '61bd1be4105ecbab1e1d44c9',
      });

    expect(status).toBe(201);
    expect(header['content-type']).toBe('application/json; charset=utf-8');
  });
});
