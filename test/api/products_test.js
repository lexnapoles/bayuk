import chai from "chai";
import request from "supertest";
import faker from "faker";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import {addUser} from "../../server/api/services/users"
import {addProductWithAllFields} from "../../server/api/services/products"
import addCategories from "../../server/seeder/database/categoriesTableSeeder";
import {getUser} from "../../server/seeder/database/usersTableSeeder";
import {getProduct} from "../../server/seeder/database/productsTableSeeder";
import {notFoundError} from "../../server/api/controllers/products/errors";

chai.should();

let server = {};

const addRandomProduct = () => {
	return addCategories()
		.then(() => addUser(getUser()))
		.then(({user}) => addProductWithAllFields(getProduct(user.id)));
};

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
					response.body.should.be.instanceOf(Array);
					response.body.should.have.lengthOf(0);
				})
		});
	});

	describe("GET /products/:productId", function () {
		it("should get a product by the given id", function () {
			let productId = "";

			return addRandomProduct()
				.then(product => productId = product.id)
				.then(() =>
					request(server)
						.get(`/api/products/${productId}`)
						.expect(200))
				.then(response => {
					response.body.should.be.instanceOf(Object);
					response.body.should.contain.all.keys([
						"id",
						"name",
						"description",
						"images",
						"owner",
						"category",
						"createdAt",
						"price"
					]);
					response.body.should.have.property("id").equal(productId);
				});
		});

		it("should fail if there's no product with the given id", function () {
			const nonExistentProduct = faker.random.uuid();

			return request(server)
				.get(`/api/products/${nonExistentProduct}`)
				.expect(404)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should have a detailed error object when failing to find a product", function () {
			const nonExistentProduct = faker.random.uuid();

			return request(server)
				.get(`/api/products/${nonExistentProduct}`)
				.expect(404)
				.then(response => {
					const error = response.body[0];

					error.should.contain.all.keys(["code", "title", "details"]);

					error.should.be.deep.equal(notFoundError());
				});
		});
	});
});