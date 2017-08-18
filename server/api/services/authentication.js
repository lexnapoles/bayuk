import jwt from 'jsonwebtoken';
import { randomBytes, pbkdf2 } from '../../../lib/promisifiedCrypto';

const config = {
  hashBytes: 64,
  saltBytes: 64,
  iterations: 1000,
  digest: 'sha512',
};

const getHash = (password, salt) =>
  pbkdf2(password, salt, config.iterations, config.hashBytes, config.digest);

export const setPassword = password =>
  randomBytes(config.saltBytes)
    .then(bytes => bytes.toString('hex'))
    .then(salt => ({
      salt,
      hash: getHash(password, salt).toString('hex'),
    }));

export const validPassword = (password, { hash, salt }) =>
  getHash(password, salt)
    .then(calculatedHash => (calculatedHash.toString('hex') === hash ? true : Promise.reject()));

export const createJwt = (payload) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + process.env.JWT_LIFETIME);

  return jwt.sign({
    ...payload,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};
