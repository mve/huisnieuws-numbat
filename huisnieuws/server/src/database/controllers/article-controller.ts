import ArticleInterface from '../interfaces/article-interface';
import { Tag } from '../interfaces/tag-interface';
import { ArticleModel } from '../models/article-model';
import { ArticleReach } from '../models/enums/articleReach';
import CommentInterface from '../interfaces/comment-interface';
import { UserModel } from '../models/user-model';

const create = async (article: ArticleInterface): Promise<ArticleInterface> => (
  ArticleModel.create(article)
);

const update = async (articleId: string, article: ArticleInterface): Promise<ArticleInterface> => (
  ArticleModel.findByIdAndUpdate(articleId, article, { new: true })
);

const get = async (id: string): Promise<ArticleInterface> => {
  // If the request is a small ID, we search for the auto increment version of the ID.
  const article = id.length > 10
    ? await ArticleModel.findById(id)
    : await ArticleModel.findOne({ id });

  article.comments = await Promise.all(article.comments.map(
    async (comment: CommentInterface) => {
      const commentClone = Object.assign(comment);
      commentClone.commenter = await UserModel.findById(comment.commenter);

      return commentClone;
    },
  ));

  return article;
};

const index = async (
  zipcode: string | null,
  reach: ArticleReach,
  tags: any[],
): Promise<ArticleInterface[]> => {
  if (!zipcode) {
    return ArticleModel.find();
  }

  const neighbourhoodRegex = `${zipcode.substring(0, 4)}..`;
  const cityRegex = `${zipcode.substring(0, 2)}....`;
  const tagsArray: Tag[] = tags && tags.map((tagItem) => (JSON.parse(tagItem)));

  switch (reach) {
    case ArticleReach.NEIGHBOURHOOD:
      if (!tags) {
        return ArticleModel.find({ zipcode: { $regex: neighbourhoodRegex }, reach });
      }
      return ArticleModel.find({
        zipcode: { $regex: neighbourhoodRegex },
        reach,
        tags: { $elemMatch: { $or: tagsArray } },
      });

    case ArticleReach.CITY:
      if (!tags) {
        return ArticleModel.find({ zipcode: { $regex: cityRegex }, reach });
      }
      return ArticleModel.find({
        zipcode: { $regex: neighbourhoodRegex },
        reach,
        tags: { $elemMatch: { $or: tagsArray } },
      });

    default:
      if (!tags) {
        return ArticleModel.find({ zipcode, reach });
      }
      return ArticleModel.find({
        zipcode,
        reach,
        tags: { $elemMatch: { $or: tagsArray } },
      });
  }
};

const deleteArticle = (articleId: string) => ArticleModel.deleteOne({ _id: articleId });

const getByAuthor = async (author: string): Promise<ArticleInterface[]> => (
  ArticleModel.find({ author })
);

const addCommentToArticle = async (articleId: string, comment:
CommentInterface) => ArticleModel.findByIdAndUpdate(articleId, {
  $push: {
    comments: comment,
  },
}, { new: true, timestamps: false });

export {
  create, get, index, deleteArticle, getByAuthor, update, addCommentToArticle,
};
