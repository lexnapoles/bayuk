const crypto = require('crypto');

export const randomBytes = bytes => new Promise((resolve, reject) =>
  crypto.randomBytes(bytes, (err, buff) => (
    err
      ? reject(err)
      : resolve(buff))));

export const pbkdf2 = (...args) =>
  new Promise((resolve, reject) =>
    crypto.pbkdf2(...args, (err, derivedKey) => (err ? reject(err) : resolve(derivedKey))));

