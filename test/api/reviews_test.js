import chai from "chai";
import request from "supertest";
import faker from "faker";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import {addUser} from "../../server/api/services/users";
import {addReview} from "../../server/api/services/reviews";
import {invalidReview} from "../../server/errors/api/reviewErrors";
import {dataNotFound} from "../../server/errors/api/controllerErrors";
import {getUser} from "../../server/seeder/database/usersTableSeeder";

chai.should();

let server = {};

const addUsersInvolvedInReview = () =>
	Promise.all([addUser(getUser()), addUser(getUser())])
		.then(users => ({
			sourceUser: users[0],
			targetUser: users[1]
		}));

const addRandomReview = () => {
	return addUsersInvolvedInReview()
		.then(({sourceUser, targetUser}) => addReview({
			rating: 5,
			description: faker.lorem.sentences(),
			source: sourceUser.user.id,
			target: targetUser.user.id
		}))
};

describe("Reviews", function () {
	beforeEach(function () {
		server = createServer();

		return db.none(global.truncateAll);
	});

	afterEach(function (done) {
		db.none(global.truncateAll);

		server.close(done);
	});

	describe("GET /reviews/:userId", function () {
		it("should get the user reviews", function () {
			return addRandomReview()
				.then(({target}) =>
					request(server)
						.get(`/api/reviews/${target}`)
						.expect(200))
				.then(response => {
					const reviews = response.body,
								review  = response.body[0];

					reviews.should.be.instanceOf(Array);
					reviews.should.not.be.empty;

					review.should.include.all.keys(["id", "rating", "description", "source", "target"]);
				});
		});
	});

	describe("POST /reviews", function () {
		it("should add a new review", function () {
			return addUsersInvolvedInReview()
				.then(({sourceUser, targetUser}) => {
					const {user: {id: source}, token} = sourceUser,
								{user: {id: target}}        = targetUser;

					return request(server)
						.post(`/api/reviews`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							source,
							target,
							rating: 4,
							description: "Good seller, product in good condition"
						})
						.expect(201)
						.expect("Location", `/api/reviews/${target}`)
				})
				.then(response => {
					const review = response.body;

					review.should.include.all.keys(["id", "rating", "description", "source", "target"]);
				})
		});

		it("should fail when no data has been sent", function () {
			return addUsersInvolvedInReview()
				.then(({sourceUser}) => {
					const {token} = sourceUser;

					return request(server)
						.post(`/api/reviews`)
						.set("Authorization", `Bearer ${token}`)
						.expect(400)
				})
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(dataNotFound("body"))
				})
		});
		it("should fail when invalid data has been sent", function () {
			return addUsersInvolvedInReview()
				.then(({sourceUser}) => {
					const {user: {id: source}, token} = sourceUser;

					return request(server)
						.post(`/api/reviews`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							source,
							target: "Invalid target",
							rating: "A rating",
							description: "Good seller"
						})
						.expect(400)
				})
				.then(response => {
					const errors = response.body,
								ratingError = invalidReview("rating", "should be integer"),
								targetError = invalidReview("target", 'should match format "uuid"');

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;

					errors.should.deep.include.members([ratingError, targetError]);
				});
		});
	});
});