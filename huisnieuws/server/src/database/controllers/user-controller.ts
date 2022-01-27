import UserInterface from '../interfaces/user-interface';
import { UserModel } from '../models/user-model';

const create = (user: UserInterface): Promise<void> => UserModel.create(user);

const findByEmail = async (email: string): Promise<UserInterface> => {
  const user = await UserModel.findOne({ email });

  if (user === null) {
    throw new Error();
  }

  return user;
};

const findUserById = async (_id: string): Promise<UserInterface> => {
  const user = await UserModel.findById(_id);
  // error handling is in the middleware function.
  return user;
};

export { create, findByEmail, findUserById };
