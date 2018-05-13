const crypto = require("crypto");

const randomBytes = bytes =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(
      bytes,
      (err, buff) => (err ? reject(err) : resolve(buff))
    )
  );

const pbkdf2 = (...args) =>
  new Promise((resolve, reject) =>
    crypto.pbkdf2(
      ...args,
      (err, derivedKey) => (err ? reject(err) : resolve(derivedKey))
    )
  );

export const getSalt = saltBytes =>
  randomBytes(saltBytes).then(bytes => bytes.toString("hex"));

export const getHash = (password, salt, { iterations, hashBytes, digest }) =>
  pbkdf2(password, salt, iterations, hashBytes, digest);
