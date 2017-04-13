import faker from "faker"
import {sample} from "lodash/collection";
import {times} from "lodash/util";
import {random} from "lodash/number";
import db from "../../db";
import {MAX_REVIEWS, MAX_USER_RATING} from "../config";
import {wrapDataInPromise} from "../../../utils/utils";

const pickUsersForReview = ids => {
	const source = sample(ids);

	let target = 0;

	do {
		target = sample(ids);
	}
	while (target === source);

	return {source, target}
};

const getReview = (ids, users = {}) => ({
	rating: random(MAX_USER_RATING),
	...pickUsersForReview(ids),
	review: faker.lorem.sentence(),
	...users
});

const addReviewToDB = review =>
	db.none("INSERT INTO reviews (rating, user_source, user_target, review) " +
		"VALUES (${rating}, ${source}, ${target}, ${review})", review);

const addAllReviewsToDB = reviews => Promise.all(wrapDataInPromise(reviews, addReviewToDB));

export default users => {
	const ids     = Array.from(users, ({id}) => id),
				reviews = times(MAX_REVIEWS, getReview.bind(void 0, ids));

	return addAllReviewsToDB(reviews)
					.then(reviews);
};