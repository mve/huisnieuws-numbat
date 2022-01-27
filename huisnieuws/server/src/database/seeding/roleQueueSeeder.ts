import fs from 'fs';
import { createRoleQueueItem } from '../controllers/roleQueue-controller';
import RoleQueueInterface from '../interfaces/roleQueue-interface';
import { RoleQueueModel } from '../models/roleQueue-model';

const roleQueueSeeder = async (roleQueuePath: string | null = null, logging: boolean = true) => {
  const roleQueue = JSON.parse(fs.readFileSync(`${roleQueuePath || process.cwd()}/roleQueue.json`, 'utf8'));

  logging && console.info(`Deleting ${await RoleQueueModel.count()} in queue...`);

  await RoleQueueModel.deleteMany();

  const promises: Promise<void>[] = [];

  roleQueue.forEach((item: RoleQueueInterface) => promises.push(createRoleQueueItem(item)));

  await Promise.all(promises);

  logging && console.info('Seeding roleQueue completed.');
};

export default roleQueueSeeder;
