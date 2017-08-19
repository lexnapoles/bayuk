import { omit } from 'lodash/object';
import db from '../../database/db';
import { users } from '../../database/sql/sql';
import { setPassword } from './authentication';
import { updateUserImage, deleteUserImageFromDisk } from './userImages';

export const getUsers = () => db.any(users.getAll);

export const getUserByEmail = email => db.one(users.getByEmail, email);

export const getUserById = id => db.one(users.getById, id);

export const getCredentials = email => db.one(users.getCredentials, email);

const addUserToDB = user => db.one(users.add, user);

export const addUser = user =>
  setPassword(user.password)
    .then(credentials => addUserToDB({ ...omit(user, 'password'), ...credentials }));

const updateUserFromDB = user => db.one(users.update, user);

export const updateUser = user =>
  updateUserImage(user.id, user.image)
    .then(() => updateUserFromDB(user));

export const updateEmail = (id, email) => db.one(users.updateEmail, { id, email });

export const updatePassword = (id, password) =>
  setPassword(password)
    .then(credentials => db.one(users.updatePassword, { id, ...credentials }));

export const deleteUser = id => getUserById(id)
  .then(({ image }) => (image ? deleteUserImageFromDisk(image) : true))
  .then(() => db.any(users.delete, id));
