import fs from 'fs';
import { TagModel } from '../models/tag-model';
import { Tag } from '../interfaces/tag-interface';
import create from '../controllers/tag-controller';

const tagSeeder = async (articlesPath: string | null = null, logging: boolean = true) => {
  const tags = JSON.parse(fs.readFileSync(`${articlesPath || process.cwd()}/tags.json`, 'utf8'));

  logging && console.info(`Deleting ${await TagModel.count()} tags...`);

  await TagModel.deleteMany();

  const promises: Promise<Tag>[] = [];

  tags.forEach((tag: Tag) => promises.push(create(tag)));

  await Promise.all(promises);

  logging && console.info('Seeding tags completed.');
};

export default tagSeeder;
