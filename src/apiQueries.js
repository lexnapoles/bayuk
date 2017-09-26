export const productsByDistanceQuery = (latitude, longitude) => ({
  sort: 'distance',
  sortOrder: 'descending',
  radius: 99999,
  latitude,
  longitude,
});

const productsByUser = (owner, sold) => ({
  owner,
  sold,
});

export const productsSoldByUserQuery = owner => productsByUser(owner, true);

export const productsOnSellByUserQuery = owner => productsByUser(owner, false);

