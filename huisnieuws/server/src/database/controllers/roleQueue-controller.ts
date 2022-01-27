import mongoose from 'mongoose';
import RoleQueueInterface from '../interfaces/roleQueue-interface';
import { RoleQueueModel } from '../models/roleQueue-model';
import { UserModel } from '../models/user-model';

const getRoleQueueById = async (id: string) => RoleQueueModel.findById(id);

const getRoleQueueByUserId = async (userId: string) => {
  const objectUserId = new mongoose.Types.ObjectId(userId);
  const roleQueueUser = await RoleQueueModel.findOne({ userId: objectUserId });
  return roleQueueUser;
};

const createRoleQueueItem = async (roleQueueItem: RoleQueueInterface)
: Promise<void> => RoleQueueModel.create(roleQueueItem);
export { getRoleQueueById, createRoleQueueItem, getRoleQueueByUserId };

const acceptPosterRequest = async (roleQueueId: string) => {
  const { userId } = await RoleQueueModel.findById(roleQueueId);

  return Promise.all([
    UserModel.findByIdAndUpdate(userId, { role: 'poster' }),
    RoleQueueModel.findByIdAndDelete(roleQueueId),
  ]);
};

export { acceptPosterRequest };
