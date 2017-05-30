import chai from "chai";
import request from "supertest";
import faker from "faker";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import {addUser} from "../../server/api/services/users";
import {addReview} from "../../server/api/services/reviews";
import {invalidReview} from "../../server/errors/api/reviewErrors";
import {unauthorizedAccess} from "../../server/errors/api/authorizationErrors";
import {userDoesNotExist} from "../../server/errors/api/userErrors";
import {dataNotFound} from "../../server/errors/api/controllerErrors";
import {getUser} from "../../server/seeder/database/usersTableSeeder";
import {createJwt} from "../../server/api/services/authentication"

chai.should();

let server = {};

const addUsersInvolvedInReview = () =>
	Promise.all([addUser(getUser()), addUser(getUser())])
		.then(users => ({
			buyer:  users[0],
			seller: users[1]
		}));

const addRandomReview = () =>
	addUsersInvolvedInReview()
		.then(({buyer, seller}) => addReview({
			rating:      5,
			description: faker.lorem.sentences(),
			buyer:       buyer.user.id,
			seller:      seller.user.id
		}));

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
				.then(({seller}) =>
					request(server)
						.get(`/api/reviews/${seller}`)
						.expect(200))
				.then(response => {
					const reviews = response.body,
								review  = response.body[0];

					reviews.should.be.instanceOf(Array);
					reviews.should.not.be.empty;

					review.should.include.all.keys(["id", "rating", "description", "buyer", "seller"]);
				});
		});
	});

	describe("POST /reviews", function () {
		it("should add a new review", function () {
			return addUsersInvolvedInReview()
				.then(({buyer, seller}) => {
					const {user: {id: buyerId}, token} = buyer,
								{user: {id: sellerId}}       = seller;

					return request(server)
						.post(`/api/reviews`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							buyer:       buyerId,
							seller:      sellerId,
							rating:      4,
							description: "Good seller, product in good condition"
						})
						.expect(201)
						.expect("Location", `/api/reviews/${sellerId}`)
				})
				.then(response => {
					const review = response.body;

					review.should.include.all.keys(["id", "rating", "description", "buyer", "seller"]);
				})
		});

		it("should fail when no data has been sent", function () {
			return addUsersInvolvedInReview()
				.then(({buyer}) => {
					const {token} = buyer;

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
				.then(({buyer}) => {
					const {user: {id: buyerId}, token} = buyer;

					return request(server)
						.post(`/api/reviews`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							buyer:       buyerId,
							seller:      "Invalid seller",
							rating:      "A rating",
							description: "Good seller"
						})
						.expect(400)
				})
				.then(response => {
					const errors      = response.body,
								ratingError = invalidReview("rating", "should be integer"),
								sellerError = invalidReview("seller", 'should match format "uuid"');

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;

					errors.should.deep.include.members([ratingError, sellerError]);
				});
		});

		it("should fail when no token has been sent", function () {
			return request(server)
				.post(`/api/reviews`)
				.expect(401)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(unauthorizedAccess())
				});
		});

		it("should fail when token is valid but the user can't be found", function () {
			const validTokenForNonExistentUser = createJwt(getUser({id: faker.random.uuid()}));

			return request(server)
				.post(`/api/reviews`)
				.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
				.expect(404)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(userDoesNotExist());
				})
		});

		it("should fail when the token user is not the one to write the review", function () {
			return addUsersInvolvedInReview()
				.then(({buyer, seller}) => {
					const {user: {id: sellerId}} = seller,
								{token}                = buyer;

					return request(server)
						.post(`/api/reviews`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							seller:      sellerId,
							buyer:       faker.random.uuid(),
							rating:      4,
							description: "Good seller, product in good condition"
						})
						.expect(401)
				})
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(unauthorizedAccess())
				});
		});
	});
});
