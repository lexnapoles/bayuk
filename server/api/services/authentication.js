import jwt from 'jsonwebtoken';
import { getSalt, getHash } from '../../../lib/promisifiedCrypto';

const config = {
  hashBytes: 64,
  saltBytes: 64,
  iterations: 1000,
  digest: 'sha512',
};

export const createCredentials = async function createCredentials(password) {
  try {
    const salt = await getSalt(config.saltBytes);
    const hash = await getHash(password, salt, config);

    return {
      salt,
      hash: hash.toString('hex'),
    };
  } catch (e) {
    throw new Error(e);
  }

};

export const validPassword = async function validPassword(providedPassword, { hash, salt }) {
  const providedPasswordHash = await getHash(providedPassword, salt, config);

  if (providedPasswordHash.toString('hex') !== hash) {
    throw new Error('Invalid password');
  }
};

export const createJwt = (payload) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + process.env.JWT_LIFETIME);

  return jwt.sign({
    ...payload,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};
