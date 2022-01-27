import fs from 'fs';
import { create } from '../controllers/user-controller';
import { UserModel } from '../models/user-model';
import UserInterface from '../interfaces/user-interface';

const userSeeder = async (usersPath: string | null = null, logging: boolean = true) => {
  const users = JSON.parse(fs.readFileSync(`${usersPath || process.cwd()}/users.json`, 'utf8'));

  logging && console.info(`Deleting ${await UserModel.count()} users...`);

  await UserModel.deleteMany();

  const promises: Promise<void>[] = [];

  users.forEach((user: UserInterface) => promises.push(create(user)));

  await Promise.all(promises);

  logging && console.info('Seeding users completed.');
};

export default userSeeder;
