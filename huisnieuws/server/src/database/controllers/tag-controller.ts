import { TagModel } from '../models/tag-model';
import { Tag } from '../interfaces/tag-interface';

const create = async (tag: Tag): Promise<Tag> => (
  TagModel.create(tag)
);

export default create;
