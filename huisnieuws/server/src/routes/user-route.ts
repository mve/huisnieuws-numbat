import express from 'express';
import { create, findByEmail } from '../database/controllers/user-controller';
import { getByAuthor } from '../database/controllers/article-controller';
import { UserModel } from '../database/models/user-model';

const userRouter = express.Router();

userRouter.post('/', async (request, response) => {
  try {
    const user = await create(request.body);
    return response.status(201).json(user);
  } catch (e: any) {
    return response.status(500).send({ error: { name: e.name, message: e.message } });
  }
});

userRouter.get('/', async (request, response) => {
  try {
    const email = String(request.query.email);
    const user = await findByEmail(email);
    return response.status(200).json(user);
  } catch (e: any) {
    return response.status(500).send({ error: { name: e.name, message: e.message } });
  }
});

userRouter.get('/:id', async (request, response) => {
  try {
    const user = await UserModel.findById(request.params.id);
    return response.status(200).json(user);
  } catch (e: any) {
    return response.status(500).send({ error: { name: e.name, message: e.message } });
  }
});

userRouter.get('/:id/articles', async (req, res) => {
  try {
    const article = await getByAuthor(req.params.id);
    return res.status(200).json(article);
  } catch (e: any) {
    return res.status(500).send({ error: { name: e.name, message: e.message } });
  }
});

export default userRouter;
