import db from "../../db";
import {reviews} from "../../sql/sql";

export const getReviews = id =>	db.any(reviews.get, {id});

export const addReview = review => db.one(reviews.add, review);
