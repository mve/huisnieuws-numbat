import { Reach } from '../enums/reach';
import { Tag } from './tag';
import { Comment } from './comment';

export type Article = {
  _id?: string,
  id?: string,
  title: string,
  text: string,
  zipcode: string,
  image: string,
  author: string,
  reach: Reach,
  tags: Tag[],
  createdAt: string,
  updatedAt: string,
  comments: Comment[],
};
