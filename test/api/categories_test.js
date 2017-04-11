import chai from "chai";
import request from "supertest";
import {addCategories, deleteCategories} from "../../server/api/services/categories";
import createServer from "../../server/server";

chai.should();

let server = {};

describe("Categories", function () {
	describe("GET /categories", function () {
		beforeEach(function () {
			server = createServer();

			return deleteCategories();
		});

		afterEach(function (done) {
			server.close(done);
		});

		it("should get all categories", function () {
			const categories = ["TV", "Movies"];

			return addCategories(categories)
				.then(() =>
					request(server)
						.get("/api/categories")
						.expect(200))
				.then(response => {
					response.body.should.be.instanceOf(Array);
					response.body.should.be.deep.equal(categories)
				});
		});
	});
});

