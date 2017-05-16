import chai from "chai";
import request from "supertest";
import faker from "faker";
import jwt from "jsonwebtoken";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import {addUser} from "../../server/api/services/users";
import {getUser} from "../../server/seeder/database/usersTableSeeder";
import {invalidUser, userAlreadyExists, loginFailed} from "../../server/errors/api/userErrors";
import {unauthorizedAccess, tokenDoesNotMatch} from "../../server/errors/api/authorizationErrors";
import {dataNotFound} from "../../server/errors/api/controllerErrors";
import {createJwt} from "../../server/api/services/authentication"
import {userDoesNotExist} from "../../server/errors/api/userErrors";

chai.should();

let server = {};

const userKeys = ["id", "name", "email", "latitude", "longitude", "image"];

describe("Users", function () {
	beforeEach(function () {
		server = createServer();

		return db.none(global.truncateAll);
	});

	afterEach(function (done) {
		db.none(global.truncateAll);

		server.close(done);
	});

	describe("POST /register", function () {
		it("should register a user", function () {
			const user = {
				email:     faker.internet.email(),
				name:      faker.name.findName(),
				password:  faker.internet.password(),
				latitude:  faker.address.latitude(),
				longitude: faker.address.longitude()
			};

			return request(server)
				.post("/api/register")
				.send(user)
				.expect(201)
				.expect("Location", /\/api\/users\/.+/);
		});

		it("should return a valid jwt with user info when successfully registering a user", function () {
			return request(server)
				.post("/api/register")
				.send(getUser())
				.expect(201)
				.then(response => {
					const tokenPayload = jwt.verify(response.body, process.env.JWT_SECRET);

					tokenPayload.should.contain.all.keys(["id", "name", "email", "latitude", "longitude", "image"]);
				})
		});

		it("should fail when no data has been sent", function () {
			return request(server)
				.post("/api/register")
				.expect(400)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no data has been sent", function () {
			return request(server)
				.post("/api/register")
				.expect(400)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(dataNotFound("body"));
				});
		});

		it("should fail when any of the required fields is not sent", function () {
			const user = {
				email:     faker.internet.email(),
				password:  faker.internet.password(),
				latitude:  faker.address.latitude(),
				longitude: faker.address.longitude()
			};

			return request(server)
				.post("/api/register")
				.send(user)
				.expect(400)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide an error for any field that is not sent", function () {
			const user = {
				password:  faker.internet.password(),
				latitude:  faker.address.latitude(),
				longitude: faker.address.longitude()
			};

			const FIELDS_DELETED = 2;

			return request(server)
				.post("/api/register")
				.send(user)
				.expect(400)
				.then(response => {
					const errors = response.body;

					errors.should.be.have.lengthOf(FIELDS_DELETED);
				})
		});

		it("should provide detailed errors for each field", function () {
			const user = {
				password:  faker.internet.password(),
				latitude:  faker.address.latitude(),
				longitude: faker.address.longitude()
			};

			return request(server)
				.post("/api/register")
				.send(user)
				.expect(400)
				.then(response => {
					const errors = response.body;

					const emailError = invalidUser("User", "should have required property email"),
								nameError  = invalidUser("User", "should have required property name");

					errors.should.deep.include.members([emailError, nameError]);
				});
		});

		it("should fail when there's already a user with the same email", function () {
			const user = getUser();

			return addUser(user)
				.then(() =>
					request(server)
						.post("/api/register")
						.send(user)
						.expect(409)
				)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when there's already a user with the same email", function () {
			const user = getUser();

			return addUser(user)
				.then(() =>
					request(server)
						.post("/api/register")
						.send(user)
						.expect(409))
				.then(response => {
					const error = response.body[0];

					error.should.deep.equal(userAlreadyExists());
				});
		});
	});

	describe("POST /login", function () {
		it("should login a user", function () {
			const user = getUser();

			return addUser(user)
				.then(() =>
					request(server)
						.post("/api/login")
						.send({
							email:    user.email,
							password: user.password
						})
						.expect(201)
						.expect("Location", /\/api\/users\/.+/));
		});

		it("should return a valid jwt with user info when successfully login a user", function () {
			const user = getUser();

			return addUser(user)
				.then(() =>
					request(server)
						.post("/api/login")
						.send({
							email:    user.email,
							password: user.password
						})
						.expect(201))
				.then(response => {
					const tokenPayload = jwt.verify(response.body, process.env.JWT_SECRET);

					tokenPayload.should.contain.all.keys(userKeys);
				});
		});

		it("should fail when no data has been sent", function () {
			return request(server)
				.post("/api/login")
				.expect(400)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no data has been sent", function () {
			return request(server)
				.post("/api/login")
				.expect(400)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(dataNotFound("body"));
				});
		});

		it("should fail when any of the required fields is not sent", function () {
			const user = getUser();

			return request(server)
				.post("/api/login")
				.send({
					password: user.password
				})
				.expect(400)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when any of the required fields is not sent", function () {
			const user = getUser();

			return request(server)
				.post("/api/login")
				.send({
					password: user.password
				})
				.expect(400)
				.then(response => {
					const error = response.body[0];

					const emailError = invalidUser("User", "should have required property email");

					error.should.be.deep.equal(emailError);
				});
		});

		it("should fail if the user is not registered", function () {
			const user = getUser();

			return request(server)
				.post("/api/login")
				.send({
					email:    user.email,
					password: user.password
				})
				.expect(401)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				})
		});

		it("should provide a detailed error if user is not registered", function () {
			const user = getUser();

			return request(server)
				.post("/api/login")
				.send({
					email:    user.email,
					password: user.password
				})
				.expect(401)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(loginFailed());
				});
		});

		it("should fail if any of the credentials is wrong", function () {
			const user              = getUser(),
						incorrectPassword = `Wrong ${user.password}`;

			return addUser(user)
				.then(() =>
					request(server)
						.post("/api/login")
						.send({
							email:    user.email,
							password: incorrectPassword
						})
						.expect(401))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when any of the credentials is wrong", function () {
			const user              = getUser(),
						incorrectPassword = `Wrong ${user.password}`;

			return addUser(user)
				.then(() =>
					request(server)
						.post("/api/login")
						.send({
							email:    user.email,
							password: incorrectPassword
						})
						.expect(401))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(loginFailed());
				});
		});
	});

	describe("PUT /users/:userId", function () {
		it("should modify the user", function () {
			const name = "New Name";

			return addUser(getUser())
				.then(({user, token}) =>
					request(server)
						.put(`/api/users/${user.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...user,
							name
						})
						.expect(200))
				.then(response => {
					const user = response.body;

					user.should.include.all.keys(userKeys);

					user.name.should.be.equal(name);
				});
		});

		it("should modify the user image", function () {
			const image = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAcFBQYFBAcGBQYIBwcIChE
			LCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJCh
			QLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/w
			AARCAAXAB0DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQG/8QAIxAAAQMFAAICAwAA
			AAAAAAAAAQACEQMEEiExQVETImGRof/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBgEF/8QAHREAAgICAwE
			AAAAAAAAAAAAAAAECAwQRBRJRQf/aAAwDAQACEQMRAD8AQNP7mIVr3wzsQFly+pJaOQ3flUV7ks1Oz0
			KZS2ccLq4AbA9SYS+pfMJGR/qmvXIBLRr17SmrlUdJdj+I4nxrTB6nW4yMna1KxXtOSXP5HR4QhJRov
			rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`;

			return addUser(getUser())
				.then(({user, token}) =>
					request(server)
						.put(`/api/users/${user.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...user,
							image
						})
						.expect(200))
				.then(response => {
					const user = response.body;

					user.should.include.all.keys(userKeys);

					user.image.should.exist();
				});
		});
	});

	describe("PUT /users/:userId/email", function () {
		it("should change the user email", function () {
			const email = "new@email.com";

			return addUser(getUser())
				.then(({user, token}) =>
					request(server)
						.put(`/api/users/${user.id}/email`)
						.set("Authorization", `Bearer ${token}`)
						.send({email})
						.expect(200))
				.then(response => {
					const tokenPayload = jwt.verify(response.body, process.env.JWT_SECRET);

					tokenPayload.should.contain.all.keys(userKeys);
				});
		});

		it("should fail when no data has been sent", function () {
			return addUser(getUser())
				.then(({user, token}) =>
					request(server)
						.put(`/api/users/${user.id}/email`)
						.set("Authorization", `Bearer ${token}`)
						.expect(400))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no data has been sent", function () {
			return addUser(getUser())
				.then(({user, token}) =>
					request(server)
						.put(`/api/users/${user.id}/email`)
						.set("Authorization", `Bearer ${token}`)
						.expect(400))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(dataNotFound("body"));
				});
		});

		it("should fail when the user is not found", function () {
			const randomUser = getUser({id: faker.random.uuid()});

			const validTokenForNonExistentUser = createJwt(randomUser);

			return request(server)
				.put(`/api/users/${randomUser.id}/email`)
				.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
				.send({email: "new@email.com"})
				.expect(404)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when the user is not found", function () {
			const randomUser = getUser({id: faker.random.uuid()});

			const validTokenForNonExistentUser = createJwt(randomUser);

			return request(server)
				.put(`/api/users/${randomUser.id}/email`)
				.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
				.send({email: "new@email.com"})
				.expect(404)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(userDoesNotExist());
				});
		});

		it("should fail when no token has been sent", function () {
			return addUser(getUser())
				.then(({user}) =>
					request(server)
						.put(`/api/users/${user.id}/email`)
						.send({email: "new@email.com"})
						.expect(401))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no token has been sent", function () {
			return addUser(getUser())
				.then(({user}) =>
					request(server)
						.put(`/api/users/${user.id}/email`)
						.send({email: "new@email.com"})
						.expect(401))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(unauthorizedAccess())
				});
		});

		it("should fail when the token does not match the userId", function () {
			return addUser(getUser())
				.then(({token}) =>
					request(server)
						.put(`/api/users/${faker.random.uuid()}/email`)
						.set("Authorization", `Bearer ${token}`)
						.send({email: "new@email.com"})
						.expect(403))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when the token does not match the userId", function () {
			const idDifferentFromTokenId = faker.random.uuid();

			return addUser(getUser())
				.then(({token}) =>
					request(server)
						.put(`/api/users/${idDifferentFromTokenId}/email`)
						.set("Authorization", `Bearer ${token}`)
						.send({email: "new@email.com"})
						.expect(403))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(tokenDoesNotMatch())
				});
		});
	});

	describe("PUT /users/:userId/password", function () {
		it("should change the user password", function () {
			const password = "newPassword123";

			return addUser(getUser())
				.then(({user, token}) =>
					request(server)
						.put(`/api/users/${user.id}/password`)
						.set("Authorization", `Bearer ${token}`)
						.send({password})
						.expect(204));
		});

		it("should fail when no data has been sent", function () {
			return addUser(getUser())
				.then(({user, token}) =>
					request(server)
						.put(`/api/users/${user.id}/password`)
						.set("Authorization", `Bearer ${token}`)
						.expect(400))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no data has been sent", function () {
			return addUser(getUser())
				.then(({user, token}) =>
					request(server)
						.put(`/api/users/${user.id}/password`)
						.set("Authorization", `Bearer ${token}`)
						.expect(400))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(dataNotFound("body"));
				});
		});

		it("should fail when the user is not found", function () {
			const randomUser = getUser({id: faker.random.uuid()});

			const validTokenForNonExistentUser = createJwt(randomUser);

			return request(server)
				.put(`/api/users/${randomUser.id}/password`)
				.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
				.send({password: "newPassword123"})
				.expect(404)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when the user is not found", function () {
			const randomUser = getUser({id: faker.random.uuid()});

			const validTokenForNonExistentUser = createJwt(randomUser);

			return request(server)
				.put(`/api/users/${randomUser.id}/password`)
				.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
				.send({password: "newPassword123"})
				.expect(404)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(userDoesNotExist());
				});
		});

		it("should fail when no token has been sent", function () {
			return addUser(getUser())
				.then(({user}) =>
					request(server)
						.put(`/api/users/${user.id}/password`)
						.send({password: "newPassword123"})
						.expect(401))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no token has been sent", function () {
			return addUser(getUser())
				.then(({user}) =>
					request(server)
						.put(`/api/users/${user.id}/password`)
						.send({password: "newPassword123"})
						.expect(401))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(unauthorizedAccess())
				});
		});

		it("should fail when the token does not match the userId", function () {
			return addUser(getUser())
				.then(({token}) =>
					request(server)
						.put(`/api/users/${faker.random.uuid()}/password`)
						.set("Authorization", `Bearer ${token}`)
						.send({password: "newPassword123"})
						.expect(403))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when the token does not match the userId", function () {
			const idDifferentFromTokenId = faker.random.uuid();

			return addUser(getUser())
				.then(({token}) =>
					request(server)
						.put(`/api/users/${idDifferentFromTokenId}/password`)
						.set("Authorization", `Bearer ${token}`)
						.send({password: "newPassword123"})
						.expect(403))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(tokenDoesNotMatch())
				});
		});
	});
})
;