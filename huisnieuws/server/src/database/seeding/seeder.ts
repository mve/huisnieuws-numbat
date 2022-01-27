import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import articleSeeder from './articleSeeder';
import userSeeder from './userSeeder';
import roleQueueSeeder from './roleQueueSeeder';
import tagSeeder from './tagSeeder';

(async () => {
  const envPath = path.join(__dirname, '../../../.env');
  dotenv.config({ path: envPath });
  const { ATLAS_URI } = process.env;

  await mongoose.connect(ATLAS_URI || '');

  await Promise.all([
    userSeeder(),
    articleSeeder(),
    roleQueueSeeder(),
    tagSeeder(),
  ]);

  await mongoose.connection.close();
})();
