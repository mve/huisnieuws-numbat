import express, { Response, Request } from 'express';
import {
  acceptPosterRequest, createRoleQueueItem, getRoleQueueByUserId,
} from '../database/controllers/roleQueue-controller';
import { verifyAdmin, verifyIsLoggedIn, verifyRole } from '../helpers/middleware';
import { RoleQueueModel } from '../database/models/roleQueue-model';
import { userRole } from '../database/models/enums/userRole';

const roleQueueRouter = express.Router();

roleQueueRouter.post('/', verifyIsLoggedIn, async (request, response) => {
  try {
    const isUser = await verifyRole(userRole.USER, String(request.headers.userid));
    if (!isUser) return response.status(401).send({ error: { message: 'Gebruiker heeft geen rechten om deze rol aan te vragen.' } });

    const isInQueue = await getRoleQueueByUserId(String(request.headers.userid));
    if (isInQueue) return response.status(401).send({ error: { message: 'Je hebt al een aanvraag ingedient.' } });

    const userQueueItem = await createRoleQueueItem(request.body);
    return response.status(201).json(userQueueItem);
  } catch (e: any) {
    return response.status(500).send({ error: { name: e.name, message: e.message } });
  }
});

roleQueueRouter.get('/', verifyIsLoggedIn, async (request, response) => {
  try {
    const userQueueItem = await getRoleQueueByUserId(String(request.query.userid));
    return response.status(200).json(userQueueItem);
  } catch (e: any) {
    return response.status(500).send({ error: { name: e.name, message: e.message } });
  }
});

roleQueueRouter.get('/all', verifyIsLoggedIn, async (request, response) => {
  try {
    const userQueueItems = await RoleQueueModel.find();
    return response.status(200).json(userQueueItems);
  } catch (e: any) {
    return response.status(500).send({ error: { name: e.name, message: e.message } });
  }
});

roleQueueRouter.put('/:id', verifyIsLoggedIn, verifyAdmin, async (request: Request, response: Response) => {
  try {
    await acceptPosterRequest(request.params.id);
    return response.status(200).send();
  } catch {
    return response.status(500).send();
  }
});

roleQueueRouter.delete('/:id', verifyAdmin, verifyIsLoggedIn, async (request: Request, response: Response) => {
  try {
    await RoleQueueModel.deleteOne({ _id: request.params.id });
    return response.status(200).send();
  } catch {
    return response.status(500).send();
  }
});

export { roleQueueRouter };
