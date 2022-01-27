import { Tag } from './tag-interface';
import CommentInterface from './comment-interface';

export default interface ArticleInterface {
  _id: number | null,
  id: number,
  title: string,
  text: string,
  zipcode: string,
  image: number,
  author: string,
  reach: string | null,
  tags: Tag[],
  createdAt: string,
  updatedAt: string,
  comments: CommentInterface[]
}
