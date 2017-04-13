import chai from "chai";
import request from "supertest";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import faker from "faker";
import jwt from "jsonwebtoken";

chai.should();

let server = {};

describe("users", function () {
	beforeEach(function () {
		server = createServer();

		return db.none(global.truncateAll);
	});

	afterEach(function (done) {
		server.close(done);
	});

	describe("POST /register", function () {

		it("should return a 201 and a location header when sucessful", function () {
			const user = {
				name:     "John Smith",
				email:    "john@smith.com",
				password: "john123",
				location: {
					latitude:  faker.address.latitude(),
					longitude: faker.address.longitude()
				}
			};


			return request(server)
				.post("/api/register")
				.send(user)
				.expect(201)
				.expect("Location", /\/api\/users\/.+/);
		});

		it("should return a valid Json Web Token with the user info when sucessful", function () {
			const user = {
				name:     "John Smith",
				email:    "john@smith.com",
				password: "john123",
				location: {
					latitude:  faker.address.latitude(),
					longitude: faker.address.longitude()
				}
			};

			return request(server)
				.post("/api/register")
				.send(user)
				.expect(201)
				.then(response => {
					const tokenPayload = jwt.verify(response.body.data, process.env.JWT_SECRET);

					tokenPayload.should.have.property("id");
					tokenPayload.should.have.property("name");
					tokenPayload.should.have.property("email");
					tokenPayload.should.have.property("location");
					tokenPayload.should.have.property("image");
				})
		});
	});
});