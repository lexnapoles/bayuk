import { getBaseUrl, getImagePath } from '../../utils';
import transform from './transformer';

const transformation = (user, req) => {
  const baseUrl = getBaseUrl(req);
  const imageUrl = `${baseUrl}${getImagePath('user', user.image)}`;

  return ({
    id: user.id,
    name: user.name,
    email: user.email,
    image: imageUrl,
    latitude: parseFloat(user.latitude),
    longitude: parseFloat(user.longitude),
    rating: user.rating,
  });
};

export default (req, user) => transform(req, user, transformation);

