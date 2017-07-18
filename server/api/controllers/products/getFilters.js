import {validateRequest} from "../validators";

const getSortingFilters = queryParameters => {
  const SORT_BY_DISTANCE = "distance",
        SORT_ORDER       = "descending";

  const errors = validateRequest(queryParameters, ["sort", "order", "radius", "latitude", "longitude"]);

  if (errors.length) {
    return {
      errors
    }
  }

  const {sort, order, radius, latitude, longitude, ...optionalQueryParams} = queryParameters;

  const filters = {
    sortByDistance: sort === SORT_BY_DISTANCE,
    descending:     order === SORT_ORDER,
    radius,
    latitude,
    longitude,
    ...optionalQueryParams
  };

  return {
    filters,
    errors: []
  }
};

const getOwnerFilters = queryParameters => {
  const {owner, sold, lastId} = queryParameters;

  const filters = {owner, sold, lastId};

  return {
    filters,
    errors: []
  };
};

export default req => {
  const query = req.query.cursor
    ? JSON.parse(Buffer.from(decodeURI(req.query.cursor), 'base64').toString())
    : req.query;

  if (query.owner) {
    return getOwnerFilters(query);
  }

  return getSortingFilters(query);
};
