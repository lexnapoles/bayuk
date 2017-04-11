import chai from "chai";
import request from "supertest";
import createServer from "../../server/server";
import {truncateProducts} from "../../server/api/services/products";

chai.should();

let server = {};

describe("Products", function () {
	beforeEach(function () {
		server = createServer();

		truncateProducts();
	});

	afterEach(function (done) {
		server.close(done);
	});

	describe("GET /products", function () {
		it("should get a list of products", function () {
			return request(server)
				.get("/api/products")
				.expect(200)
				.then(response => {
					response.status.should.equal(200);
					response.body.should.be.instanceOf(Array);
					response.body.should.have.lengthOf(0);
				})
		});
	});
});
