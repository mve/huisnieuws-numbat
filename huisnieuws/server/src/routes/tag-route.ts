import express from 'express';
import { TagModel } from '../database/models/tag-model';

const tagRouter = express.Router();

tagRouter.get('/', async (request, response) => {
  try {
    const tags = await TagModel.find();
    return response.status(200).json(tags);
  } catch (e: any) {
    return response.status(500).send({ error: { name: e.name, message: e.message } });
  }
});

export default tagRouter;
