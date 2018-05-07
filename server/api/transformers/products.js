import { getBaseUrl, getImagePath } from "../../utils";
import transform from "./transformer";

const transformation = (product, req) => {
  const baseUrl = getBaseUrl(req);

  return {
    id: product.id,
    name: product.name,
    images: product.images.map(
      id => `${baseUrl}${getImagePath("product", id)}`
    ),
    owner: product.owner,
    description: product.description,
    category: product.category,
    createdAt: product.created_at,
    price: parseInt(product.price, 10),
    latitude: parseFloat(product.latitude),
    longitude: parseFloat(product.longitude),
    sold: product.sold
  };
};

export default (req, product) => transform(req, product, transformation);
