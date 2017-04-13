import chai from "chai";
import request from "supertest";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import faker from "faker";

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

		it("should register a user", function () {
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
		});
	});
});