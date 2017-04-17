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

const getAUserToken = () => {
	return addCategories()
		.then(() =>
			request(server)
				.post("/api/register")
				.send(getUser())
				.expect(201)
		)
		.then(response => response.body);
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
					const products = response.body;
					products.should.be.instanceOf(Array);
					products.should.have.lengthOf(0);
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
					const product = response.body;

					product.should.be.instanceOf(Object);
					product.should.contain.all.keys([
						"id",
						"name",
						"description",
						"images",
						"owner",
						"category",
						"createdAt",
						"price",
						"sold"
					]);
					product.should.have.property("id").equal(productId);
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

	describe("POST /products", function () {
		it("should successfully add a product", function () {
			const product = {
				name:        "Ray Ban sunglasses",
				description: "Good as new, original Ray Ban sunglasses",
				category:    "Accessories",
				price:       50,
				images:      [
					`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAcFBQYFBAcGBQYIBwcIChE
					LCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJCh
					QLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/w
					AARCAAXAB0DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQG/8QAIxAAAQMFAAICAwAA
					AAAAAAAAAQACEQMEEiExQVETImGRof/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBgEF/8QAHREAAgICAwE
					AAAAAAAAAAAAAAAECAwQRBRJRQf/aAAwDAQACEQMRAD8AQNP7mIVr3wzsQFly+pJaOQ3flUV7ks1Oz0
					KZS2ccLq4AbA9SYS+pfMJGR/qmvXIBLRr17SmrlUdJdj+I4nxrTB6nW4yMna1KxXtOSXP5HR4QhJRov
					rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`
				]
			};

			return getAUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.send(product)
						.expect(201)
				)
				.then(response => {
					const product = response.body;

					product.should.contain.all.keys([
						"id",
						"name",
						"description",
						"images",
						"owner",
						"category",
						"createdAt",
						"price",
						"sold"
					]);
				})
		});
	});
})
;