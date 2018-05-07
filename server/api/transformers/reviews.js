import transform, { extractFields } from "./transformer";
import defaultEmbeddedDataAccessors from "./reviews/embeddedDataAccessors";

const validFields = ["target", "source"];

const areValidFields = (fields = []) =>
  fields.every(field => validFields.includes(field));

export const extractIncludeFields = (req, embeddedDataAccessors) => {
  const fields = extractFields(req, "include");

  return areValidFields(fields, embeddedDataAccessors) ? fields : undefined;
};

const hasUserFields = fields =>
  fields.includes("source") || fields.includes("target");

const getUsers = (req, fields, review, embeddedDataAccessors) => {
  if (!hasUserFields(fields)) {
    return [];
  }

  const userFields = fields.filter(
    field => field === "source" || field === "target"
  );

  return Promise.all(
    userFields.map(field => embeddedDataAccessors[field](req, review))
  );
};

async function getFields(req, fields, review, embeddedDataAccessors) {
  const users = await getUsers(req, fields, review, embeddedDataAccessors);

  return {
    users: users.length ? users : undefined
  };
}

const transformation = ({
  id,
  source,
  target,
  rating,
  description,
  product,
  created_at
}) => ({
  id,
  source,
  target,
  rating,
  description,
  product,
  createdAt: created_at
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
