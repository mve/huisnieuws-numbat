import { User } from './user';

export type Comment = {
  _id?: string,
  comment: string,
  commenter: User,
  createdAt: string,
  updatedAt: string
};
