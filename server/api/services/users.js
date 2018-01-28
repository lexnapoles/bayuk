import { omit } from 'lodash/object';
import db from '../../database/db';
import { users } from '../../database/sql/sql';
import { createCredentials } from './authentication';
import { updateUserImage, deleteUserImageFromDisk } from './userImages';

export const getUsers = () => db.any(users.getAll);

export const getUserByEmail = email => db.one(users.getByEmail, email);

export const getUserById = id => db.one(users.getById, id);

export const getCredentials = email => db.one(users.getCredentials, email);

const addUserToDB = user => db.one(users.add, user);

export const addUser = async function addUser(user) {
  try {
    const newUserCredentials = await createCredentials(user.password);

    return addUserToDB({ ...omit(user, 'password'), ...newUserCredentials });
  } catch (e) {
    throw new Error(e);
  }
};

const updateUserFromDB = user => db.one(users.update, user);

export const updateUser = async function updateUser(user) {
  try {
    await updateUserImage(user.id, user.image);
    return updateUserFromDB(user);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateEmail = (id, email) =>
  db.one(users.updateEmail, {
    id,
    email,
  });

export const updatePassword = async function updatePassword(id, password) {
  const newCredentials = await createCredentials(password);

  return db.one(users.updatePassword, { id, ...newCredentials });
};

export const deleteUser = async function deleteUser(id) {
  const { image } = await getUserById(id);

  try {
    if (image) {
      await deleteUserImageFromDisk(image);
    }

    return db.any(users.delete, id);
  } catch (e) {
    throw new Error(e);
  }
};
