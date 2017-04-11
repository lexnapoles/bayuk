import {sample} from "lodash/collection";
import chai from "chai";
import request from "supertest";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import addCategories from "../../server/seeder/database/categoriesTableSeeder";
import addUsers from "../../server/seeder/database/usersTableSeeder";
import addProducts from "../../server/seeder/database/productsTableSeeder";

chai.should();

let server = {};

describe("Products", function () {
	beforeEach(function () {
		server = createServer();

		return db.none(global.truncateAll);
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

	describe("GET /products/:id", function () {
		it("should get a product with the given id", function () {
			let productId  = "";

			return addCategories()
				.then(addUsers)
				.then(addProducts)
				.then(products => productId = sample(products).uuid)
				.then(() =>
					request(server)
						.get(`/api/products/${productId}`)
						.expect(200))
				.then(response => {
					response.status.should.equal(200);
					response.body.should.be.instanceOf(Object);
					response.body.should.have.property("id", productId);
				});
		});
	});
});
