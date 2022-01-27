import fs from 'fs';
import { ArticleModel } from '../models/article-model';
import ArticleInterface from '../interfaces/article-interface';
import { create } from '../controllers/article-controller';

const articleSeeder = async (articlesPath: string | null = null, logging: boolean = true) => {
  const articles = JSON.parse(fs.readFileSync(`${articlesPath || process.cwd()}/articles.json`, 'utf8'));

  logging && console.info(`Deleting ${await ArticleModel.count()} articles...`);

  await ArticleModel.deleteMany();

  const promises: Promise<ArticleInterface>[] = [];

  articles.forEach((article: ArticleInterface) => promises.push(create(article)));

  await Promise.all(promises);

  logging && console.info('Seeding articles completed.');
};

export default articleSeeder;
