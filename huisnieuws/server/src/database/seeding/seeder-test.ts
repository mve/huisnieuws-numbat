import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import articleSeeder from './articleSeeder';
import userSeeder from './userSeeder';
import roleQueueSeeder from './roleQueueSeeder';
import tagSeeder from './tagSeeder';

const envPath = path.join(__dirname, '../../../.env');

dotenv.config({ path: envPath });

const { TEST_ATLAS_URI } = process.env;

(async () => {
  await mongoose.connect(TEST_ATLAS_URI || '');

  await userSeeder();
  await articleSeeder();
  await roleQueueSeeder();
  await tagSeeder();

  await mongoose.connection.close();
})();
