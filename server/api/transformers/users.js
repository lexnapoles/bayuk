import {getImagePath} from "../../utils";
import {transform} from "./transformer";
import {getBaseUrl} from "../../utils";

const transformation = (user, req) => {
  const baseUrl  = getBaseUrl(req),
        imageUrl = `${baseUrl}${getImagePath("user", user.image)}`;

  return ({
    id:        user.id,
    name:      user.name,
    email:     user.email,
    image:     imageUrl,
    latitude:  parseFloat(user.latitude),
    longitude: parseFloat(user.longitude),
    rating:    user.rating,
  });
};

export const transformUser = (req, user) => transform(req, user, transformation);

