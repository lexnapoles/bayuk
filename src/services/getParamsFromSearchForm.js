import { findKey } from 'lodash/object';

const getPrice = ({ price: { min, max } }) => ({
  minPrice: Math.min(min, max),
  maxPrice: Math.max(min, max),
});

const getSort = (data) => {
  let sort = '';
  let sortOrder = '';

  switch (data.sort) {
    case 'distance':
      sort = 'distance';
      sortOrder = 'ascending';
      break;
    case 'Expensive':
      sort = 'price';
      sortOrder = 'descending';
      break;
    case 'Cheap':
      sort = 'price';
      sortOrder = 'ascending';
      break;
    case 'New':
      sort = 'date';
      sortOrder = 'ascending';
      break;
    default:
      sort = 'distance';
      sortOrder = 'ascending';
      break;
  }

  return {
    sort,
    sortOrder,
  };
};

const getRadius = (data) => {
  switch (data.distance) {
    case '1km':
      return 1;
    case '5km':
      return 5;
    case '10km':
      return 10;
    default:
      return 99999;
  }
};

export default (data) => {
  const category = findKey(data.categories, value => value);

  return {
    category,
    name: data.name,
    radius: getRadius(data),
    ...data.location,
    ...getPrice(data),
    ...getSort(data),
  };
};
