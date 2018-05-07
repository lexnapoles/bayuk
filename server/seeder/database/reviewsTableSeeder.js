import faker from "faker";
import { sample } from "lodash/collection";
import { times } from "lodash/util";
import { random } from "lodash/number";
import { addReview } from "../../api/services/reviews";
import { MAX_REVIEWS, MAX_USER_RATING } from "../config";
import { wrapDataInPromise } from "../../utils";

const pickUsersForReview = (ids) => {
  const sourceId = sample(ids);

  let targetId = 0;

  do {
    targetId = sample(ids);
  }
  while (targetId === sourceId);

  return {
    sourceId,
    targetId,
  };
};

const getReview = (ids, products, users = {}) => ({
  rating: random(MAX_USER_RATING),
  description: faker.lorem.sentence(),
  productId: sample(products).uuid,
  ...pickUsersForReview(ids),
  ...users
});

export default (users, products) => {
  const ids = Array.from(users, ({ id }) => id);
  const reviews = times(MAX_REVIEWS, getReview.bind(undefined, ids, products));

  return Promise.all(wrapDataInPromise(reviews, addReview));
};
