import {getBaseUrl} from "../../../utils";

const generateLinkHeaders = (req, products, filters) => {
  const {id: lastId} = products[products.length - 1];

  const nextFilter = {
    ...filters,
    lastId
  };

  const baseUrl = getBaseUrl(req),
        link    = encodeURI(Buffer.from(JSON.stringify(nextFilter)).toString('base64'));

  return `<${baseUrl}/api/products?cursor=${link}>; rel="next"`;
};

export default (req, res, products, filters) => res.set("Link", generateLinkHeaders(req, products, filters));