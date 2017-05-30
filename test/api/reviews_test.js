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
		.then(users => ({
			sourceUser: users[0],
			targetUser: users[1]
		}));

const addRandomReview = () => {
	return addUsersInvolvedInReview()
		.then(({sourceUser, targetUser}) => addReview({
			rating: 5,
			review: faker.lorem.sentences(),
			source: sourceUser.user.id,
			target: targetUser.user.id
		}))
};

describe.only("Reviews", function () {
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

					review.should.include.all.keys(["id", "rating", "review", "source", "target"]);
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
							review: "Good seller, product in good condition"
						})
						.expect(201)
						.expect("Location", `/api/reviews/${target}`)
				})
				.then(response => {
					const review = response.body;

					review.should.include.all.keys(["id", "rating", "review", "source", "target"]);
				})
		});
	});
});