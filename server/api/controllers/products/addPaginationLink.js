import { getBaseUrl } from "../../../utils";

const generateLinkHeaders = (req, products, filters) => {
  const { id: lastId } = products[products.length - 1];

  const nextFilter = {
    ...filters,
    lastId
  };

  const baseUrl = getBaseUrl(req);
  const link = encodeURI(
    Buffer.from(JSON.stringify(nextFilter)).toString("base64")
  );

  return `<${baseUrl}/api/products?cursor=${link}>; rel="next"`;
};

export default (req, res, products, filters) => {
  const MAX_ITEMS_PER_PAGE = 20;

  if (products.length < MAX_ITEMS_PER_PAGE) {
    return;
  }

  res.set("Link", generateLinkHeaders(req, products, filters));
};
