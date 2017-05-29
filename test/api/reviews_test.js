import chai from "chai";
import request from "supertest";
import faker from "faker";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import {addUser} from "../../server/api/services/users";
import {addReview} from "../../server/api/services/reviews";
import {getUser} from "../../server/seeder/database/usersTableSeeder";

chai.should();

let server = {};

const addUsersInvolvedInReview = () =>
	Promise.all([addUser(getUser()), addUser(getUser())])
		.then(users => [users[0].user, users[1].user]);

describe("Reviews", function () {
	beforeEach(function () {
		server = createServer();

		return db.none(global.truncateAll);
	});

	afterEach(function (done) {
		db.none(global.truncateAll);

		server.close(done);
	});

	describe("GET /:userId/reviews", function () {
		it("should get the user reviews", function () {
			return addUsersInvolvedInReview()
				.then(users => addReview({
					rating: 5,
					review: faker.lorem.sentences(),
					source: users[0].id,
					target: users[1].id
				}))
				.then(({target}) =>
					request(server)
						.get(`/api/${target}/reviews`)
						.expect(200))
				.then(response => {
					const reviews = response.body,
								review  = response.body[0];

					reviews.should.be.instanceOf(Array);
					reviews.should.not.be.empty;

					review.should.include.all.keys(["id", "rating", "review", "source", "target"]);
				});
		});
	});
});