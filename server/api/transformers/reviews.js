import transform, { extractFields } from "./transformer";
import defaultEmbeddedDataAccessors from "./reviews/embeddedDataAccessors";

const validFields = ['target', 'source', 'product'];

const areValidFields = (fields = []) =>
  fields.every(field => validFields.includes(field));

export const extractIncludeFields = (req) => {
  const fields = extractFields(req, 'include');

  return areValidFields(fields) ? fields : undefined;
};

async function getFields(req, fields, review, embeddedDataAccessors) {
  const embeddedFields = await Promise.all(
    fields.map(field => embeddedDataAccessors[field](req, review)),
  );

  const embeddedData = embeddedFields.reduce((acc, data, index) => {
    const fieldName = fields[index];

    acc[fieldName] = data;

    return acc;
  }, {});

  return embeddedData;
}

const transformation = ({
  id,
  source_id,
  target_id,
  rating,
  description,
  product_id,
  created_at,
}) => ({
  id,
  sourceId: source_id,
  targetId: target_id,
  rating,
  description,
  productId: product_id,
  createdAt: created_at,
});

export default async function(
  req,
  review,
  embeddedDataAccessors = defaultEmbeddedDataAccessors
) {
  const includeFields = extractIncludeFields(req);
  const transformedReview = await transform(req, review, transformation);

  if (includeFields) {
    const embeddedData = await getFields(
      req,
      includeFields,
      review,
      embeddedDataAccessors
    );

    return {
      ...transformedReview,
      ...embeddedData
    };
  }

  return transformedReview;
}
