import faker from 'faker';
import { times } from 'lodash/util';
import { MAX_USERS } from '../config';
import { addUser } from '../../api/services/users';
import { wrapDataInPromise } from '../../utils';

export const getUser = (user = {}) => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
  latitude: parseFloat(faker.address.latitude()),
  longitude: parseFloat(faker.address.longitude()),
  ...user,
});

const addAllUsersToDB = users => Promise.all(wrapDataInPromise(users, addUser));

export default () => {
  const randomUsers = times(MAX_USERS, getUser);

  return addAllUsersToDB(randomUsers);
};
