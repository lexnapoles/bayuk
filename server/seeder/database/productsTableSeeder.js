import faker from "faker";
import { sample } from "lodash/collection";
import { times } from "lodash/util";
import { addProductWithAllFields } from "../../api/services/products";
import { MAX_PRODUCTS, categories } from "../config";
import { wrapDataInPromise } from "../../utils";

export const getProduct = userId => ({
  uuid: faker.random.uuid(),
  owner: userId,
  name: faker.random.words(),
  description: faker.lorem.sentences(),
  category: sample(categories),
  price: faker.random.number(500),
  createdAt: faker.date.recent(),
  sold: faker.random.boolean()
});

const addAllProductsToDB = products =>
  Promise.all(wrapDataInPromise(products, addProductWithAllFields));

export default users => {
  const userIds = Array.from(users, ({ id }) => id);
  const products = times(
    MAX_PRODUCTS,
    getProduct.bind(undefined, () => sample(userIds))
  );

  return addAllProductsToDB(products).then(() => products);
};
