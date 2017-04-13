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

const addRandomProduct = () =>
	addCategories()
		.then(addUsers)
		.then(addProducts)
		.then(products => sample(products));

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
					response.body.should.have.property("data");

					response.body.data.should.be.instanceOf(Array);
					response.body.data.should.have.lengthOf(0);
				})
		});
	});

	describe("GET /products/:productId", function () {
		it("should get a product by the given id", function () {
			let productId = "";

			return addRandomProduct()
				.then(product => productId = product.uuid)
				.then(() =>
					request(server)
						.get(`/api/products/${productId}`)
						.expect(200))
				.then(response => {
					response.body.should.have.property("data");

					response.body.data.should.be.instanceOf(Object);
					response.body.data.should.contain.all.keys([
						"id",
						"name",
						"description",
						"images",
						"owner",
						"category",
						"createdAt",
						"price"
					]);
					response.body.data.should.have.property("id").equal(productId);
				});
		});
	});
});
