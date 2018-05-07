import db from "../../database/db";
import { wrapDataInPromise } from "../../utils";

const addProductImageToDB = productId =>
  db.none("INSERT INTO product_images (product_id) VALUES ($1)", productId);

const addAllProductImagesToDB = productIds =>
  Promise.all(wrapDataInPromise(productIds, addProductImageToDB));

export default products => {
  const productIds = Array.from(products, ({ uuid }) => uuid);

  return addAllProductImagesToDB(productIds);
};
