import jwt from 'jsonwebtoken';
import { getSalt, getHash } from '../../../lib/promisifiedCrypto';

const config = {
  hashBytes: 64,
  saltBytes: 64,
  iterations: 1000,
  digest: 'sha512',
};

export const setPassword = (password) => {
  let salt = '';

  return getSalt(config.saltBytes)
    .then((createdSalt) => { salt = createdSalt; })
    .then(() => getHash(password, salt, config))
    .then(generatedHash => ({
      salt,
      hash: generatedHash.toString('hex'),
    }));
};

export const validPassword = (password, { hash, salt }) =>
  getHash(password, salt, config)
    .then(calculatedHash => (calculatedHash.toString('hex') === hash ? true : Promise.reject()));

export const createJwt = (payload) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + process.env.JWT_LIFETIME);

  return jwt.sign({
    ...payload,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};
