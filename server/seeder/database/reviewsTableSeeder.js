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

const createReview = ids => ({
	rating: random(MAX_USER_RATING),
	...pickUsersForReview(ids),
	review: faker.lorem.sentence()
});

const addReview = review =>
	db.none("INSERT INTO reviews (rating, user_source, user_target, review) " +
		"VALUES (${rating}, ${source}, ${target}, ${review})", review);

export default users => {
	const ids     = Array.from(users, ({uuid}) => uuid),
				reviews = times(MAX_REVIEWS, createReview.bind(void 0, ids));

	return Promise.all(wrapDataInPromise(reviews, addReview))
					.then(reviews);
};