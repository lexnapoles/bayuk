import {getImagePath} from "../../utils";
import {extractFields, getSelectedFields, getBaseUrl} from "./transformer"

const transform = (req, user) => {
  const baseUrl  = getBaseUrl(req),
        imageUrl = `${baseUrl}${getImagePath("user", user.image)}`;

  return ({
    id:        user.id,
    name:      user.name,
    email:     user.email,
    image:     imageUrl,
    latitude:  parseFloat(user.latitude),
    longitude: parseFloat(user.longitude),
  });
};

export const transformUser = (req, user) => {
  const fields = extractFields(req);

  return getSelectedFields(transform(req, user), fields);
};

