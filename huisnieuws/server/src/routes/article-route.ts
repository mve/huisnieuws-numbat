import express, { Request, Response } from 'express';
import {
  addCommentToArticle, create, deleteArticle, get, index, update,
} from '../database/controllers/article-controller';
import ArticleInterface from '../database/interfaces/article-interface';
import {
  verifyAuthor, verifyPoster, verifyIsLoggedIn, verifyZipcode, verifyCanDeleteArticle,
} from '../helpers/middleware';
import { formatZipcode } from '../helpers/utils';

const articleRouter = express.Router();

articleRouter.get('/', async (request: any, result) => {
  if (request.query.zipcode) {
    request.query.zipcode = formatZipcode(request.query.zipcode);
  }
  try {
    const articles = await index(
      request.query.zipcode ?? null,
      request.query.reach,
      request.query.formatTags ?? null,
    );
    return result.status(200).json(articles);
  } catch (e: any) {
    return result.status(500).send(JSON.stringify(e));
  }
});

articleRouter.post('/', verifyZipcode, verifyIsLoggedIn, verifyPoster, async (req: Request<any, any, ArticleInterface, any>, res: Response) => {
  try {
    req.body.zipcode = formatZipcode(req.body.zipcode);
    const createdArticle = await create(req.body);
    return res.status(201).json(createdArticle);
  } catch (e: any) {
    return res.status(500).send(JSON.stringify(e));
  }
});

articleRouter.put('/:id', verifyZipcode, verifyIsLoggedIn, verifyPoster, verifyAuthor, async (req: Request<any, any, ArticleInterface, any>, res: Response) => {
  try {
    req.body.zipcode = formatZipcode(req.body.zipcode);
    const updatedArticle = await update(req.params.id, req.body);
    return res.status(200).json(updatedArticle);
  } catch (e: any) {
    return res.status(500).send(JSON.stringify(e));
  }
});

articleRouter.get('/:id', async (req, res) => {
  try {
    const article = await get(req.params.id);
    return res.status(200).send(article);
  } catch {
    return res.status(403).send();
  }
});

articleRouter.delete('/:id', verifyCanDeleteArticle, async (req, res) => {
  try {
    const article = await deleteArticle(req.params.id);
    return res.status(200).json(article);
  } catch {
    return res.status(500).send();
  }
});

articleRouter.post('/:id/comments', verifyIsLoggedIn, async (req: Request, res: Response) => {
  if (req.body.comment.length > 400) return res.status(422).send(JSON.stringify('Reactie is te lang'));

  try {
    const comment = await addCommentToArticle(
      req.params.id,
      { comment: req.body.comment, commenter: String(req.headers.userid) },
    );
    return res.status(200).send(comment);
  } catch {
    return res.status(403).send();
  }
});

articleRouter.use((error: any, req: any, res: any, next: any) => {
  next();

  return res.status(400).send(JSON.stringify(error));
});

export default articleRouter;
