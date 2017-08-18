import db from '../../database/db';
import { reviews } from '../../database/sql/sql';

export const getReviews = id => db.any(reviews.get, { id });

export const addReview = review => db.one(reviews.add, review);
