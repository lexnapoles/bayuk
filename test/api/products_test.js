import chai from "chai";
import chaiFs from "chai-fs";
import request from "supertest";
import faker from "faker";
import createServer from "../../server/server";
import db from "../../server/db";
import {global} from "../../server/sql/sql";
import {addUser} from "../../server/api/services/users"
import {getImagePath} from "../../server/api/services/images";
import {addProduct} from "../../server/api/services/products"
import {transformProduct} from "../../server/api/transformers/products";
import addCategories from "../../server/seeder/database/categoriesTableSeeder";
import {getUser as getRandomUser} from "../../server/seeder/database/usersTableSeeder";
import {cleanAllPreviouslyCreatedImages} from "../../server/seeder/filesystem/productsImagesSeeder";
import {notFoundError, invalidProduct} from "../../server/errors/api/productErrors";
import {unauthorizedAccess} from "../../server/errors/api/authorizationErrors";
import {dataNotFound, invalidId} from "../../server/errors/api/controllerErrors";
import {createJwt} from "../../server/api/services/authentication"
import {userDoesNotExist} from "../../server/errors/api/userErrors";

chai.use(chaiFs);
chai.should();

let server = {};

const getProduct = () => ({
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
			rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`,

		`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAcFBQYFBAcGBQYIBwcIChE
			LCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJCh
			QLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/w
			AARCAAXAB0DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQG/8QAIxAAAQMFAAICAwAA
			AAAAAAAAAQACEQMEEiExQVETImGRof/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBgEF/8QAHREAAgICAwE
			AAAAAAAAAAAAAAAECAwQRBRJRQf/aAAwDAQACEQMRAD8AQNP7mIVr3wzsQFly+pJaOQ3flUV7ks1Oz0
			KZS2ccLq4AbA9SYS+pfMJGR/qmvXIBLRr17SmrlUdJdj+I4nxrTB6nW4yMna1KxXtOSXP5HR4QhJRov
			rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`
	]
});

const getUserToken = () => {
	return addUser(getRandomUser())
		.then(({token}) => token);
};

const addRandomProduct = () => {
	let token = "";

	return addUser(getRandomUser())
		.then(userData => {
			token = userData.token;

			return addProduct({
				owner: userData.user.id,
				...getProduct()
			})
		})
		.then(createdProduct => ({
			token,
			product: transformProduct(createdProduct)
		}));
};

describe("Products", function () {
	beforeEach(function () {
		return cleanAllPreviouslyCreatedImages()
			.then(() => db.none(global.truncateAll))
			.then(() => addCategories())
			.then(() => server = createServer());
	});

	afterEach(function () {
		return cleanAllPreviouslyCreatedImages()
			.then(() => db.none(global.truncateAll))
			.then(() => server.close());
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
				.then(({product}) => productId = product.id)
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

		it("should fail when the product id is not valid", function () {
			const productId = void 0;

			return request(server)
				.get(`/api/products/${productId}`)
				.expect(400)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when the product id is not valid", function () {
			const productId = void 0;

			return request(server)
				.get(`/api/products/${productId}`)
				.expect(400)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(invalidId());
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
		it("should add a product", function () {
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

			return getUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.send(product)
						.expect(201)
						.expect("Location", /\/api\/products\/.+/))
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
				});
		});

		it("should fail when no data has been sent", function () {
			return getUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.expect(400))
				.then(response => {
						const errors = response.body;

						errors.should.be.instanceOf(Array);
						errors.should.not.be.empty;
					}
				);
		});

		it("should provide a detailed error when no data has been sent", function () {
			return getUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.expect(400))
				.then(response => {
						const error = response.body[0];

						error.should.be.deep.equal(dataNotFound("body"))
					}
				);
		});

		it("should fail when any of the required fields is not sent", function () {
			const product = {
				name:        "Ray Ban sunglasses",
				description: "Good as new, original Ray Ban sunglasses",
				category:    "Accessories"
			};

			return getUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.send(product)
						.expect(400))
				.then(response => {
						const errors = response.body;

						errors.should.be.instanceOf(Array);
						errors.should.not.be.empty;
					}
				);
		});

		it("should provide an error for any field that is not sent", function () {
			const product = {
				name:        "Ray Ban sunglasses",
				description: "Good as new, original Ray Ban sunglasses",
				category:    "Accessories"
			};

			const FIELDS_DELETED = 2;

			return getUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.send(product)
						.expect(400))
				.then(response => {
					const errors = response.body;

					errors.should.be.have.lengthOf(FIELDS_DELETED);
				})
		});

		it("should provide detailed errors for each field", function () {
			const product = {
				name:        "Ray Ban sunglasses",
				description: "Good as new, original Ray Ban sunglasses",
				category:    "Accessories"
			};

			return getUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.send(product)
						.expect(400))
				.then(response => {
					const errors = response.body;

					const priceError  = invalidProduct("Product", "should have required property price"),
								imagesError = invalidProduct("Product", "should have required property images");

					errors.should.deep.include.members([priceError, imagesError]);
				});
		});

		it("should fail when invalid data has been sent", function () {
			return getUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.send({
							...getProduct(),
							name:  234,
							price: "50"
						})
						.expect(400))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide detailed errors for every invalid field sent", function () {
			return getUserToken()
				.then(token =>
					request(server)
						.post("/api/products")
						.set("Authorization", `Bearer ${token}`)
						.send({
							...getProduct(),
							name:  234,
							price: "50"
						})
						.expect(400))
				.then(response => {
					const errors     = response.body,
								nameError  = invalidProduct("name", "should be string"),
								priceError = invalidProduct("price", "should be integer");

					errors.should.deep.include.members([nameError, priceError]);
				});
		});

		it("should fail when no token has been sent", function () {
			return request(server)
				.post("/api/products")
				.send(getProduct())
				.expect(401)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no token has been sent", function () {
			return request(server)
				.post("/api/products")
				.send(getProduct())
				.expect(401)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(unauthorizedAccess())
				});
		});

		it("should fail when token is valid but the token's user can't be found", function () {
			const validTokenForNonExistentUser = createJwt(getRandomUser());

			return request(server)
				.post("/api/products")
				.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
				.send(getProduct())
				.expect(404)
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when token is valid but the token's user can't be found", function () {
			const validTokenForNonExistentUser = createJwt(getRandomUser());

			return request(server)
				.post("/api/products")
				.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
				.send(getProduct())
				.expect(404)
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(userDoesNotExist());
				});
		});
	});

	describe("PUT /products/:productId", function () {
		it("should update a product", function () {
			return addRandomProduct()
				.then(({token, product}) => {
					return request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							price:       987,
							description: "Updated product description"
						})
						.expect(200)
				})
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
				});
		});

		it("should update the images of a product", function () {
			const images = [getProduct().images[0]];
			let oldImages = [];

			return addRandomProduct()
				.then(({token, product}) => {
					oldImages = product.images;

					return request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							images
						})
						.expect(200)
				})
				.then(response => {
					const {images} = response.body;

					images.length.should.not.be.equal(oldImages.length);
					images.should.be.lengthOf(1);
					images.should.not.include.members(oldImages);
				});
		});

		it("should delete the old images and add the new ones in the filesystem", function () {
			const base64Image = getProduct().images[0];
			let oldImagesIds = [];

			return addRandomProduct()
				.then(({token, product}) => {
					oldImagesIds = product.images;

					return request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							images: [base64Image]
						})
						.expect(200)
				})
				.then(response => {
					const {images: ids}  = response.body,
								newImage       = getImagePath(ids[0]),
								firstOldImage  = getImagePath(oldImagesIds[0]),
								secondOldImage = getImagePath(oldImagesIds[1]);

					newImage.should.be.a.file();

					firstOldImage.should.not.be.a.path();
					secondOldImage.should.not.be.a.path();
				});
		});

		it("should maintain the old images in the filesystem when they are included", function () {
			const base64Image = getProduct().images[0];
			let oldImagesIds = [];

			return addRandomProduct()
				.then(({token, product}) => {
					oldImagesIds = product.images;

					return request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							images: [...oldImagesIds, base64Image]
						})
						.expect(200)
				})
				.then(response => {
					const {images: ids}  = response.body,
								newImage       = getImagePath(ids[0]),
								firstOldImage  = getImagePath(oldImagesIds[0]),
								secondOldImage = getImagePath(oldImagesIds[1]);

					newImage.should.be.a.file();

					firstOldImage.should.be.a.file();
					secondOldImage.should.be.a.file();
				});
		});

		it("should delete the old images in the filesystem that are not included", function () {
			let oldImagesIds = [];

			return addRandomProduct()
				.then(({token, product}) => {
					oldImagesIds = product.images;
					return request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							images: [oldImagesIds[0]]
						})
						.expect(200)
				})
				.then(() => {
					const firstOldImage  = getImagePath(oldImagesIds[0]),
								secondOldImage = getImagePath(oldImagesIds[1]);

					firstOldImage.should.be.a.file();

					secondOldImage.should.not.be.a.path();
				});
		});

		it("should fail when no product has been sent", function () {
			return addRandomProduct()
				.then(({token, product}) => {
					return request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.expect(400)
				})
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no product has been sent", function () {
			return addRandomProduct()
				.then(({token, product}) => {
					return request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.expect(400)
				})
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(dataNotFound("body"))
				});
		});

		it("should fail when incorrect data has been sent", function () {
			return addRandomProduct()
				.then(({token, product}) => {
					return request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							price: "Price as string",
							name:  465
						})
						.expect(400)
				});
		});

		it("should provide a detailed error for each invalid field that has been sent", function () {
			return addRandomProduct()
				.then(({token, product}) =>
					request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							price: "Price as string",
							name:  465
						})
						.expect(400))
				.then(response => {
					const errors     = response.body,
								nameError  = invalidProduct("name", "should be string"),
								priceError = invalidProduct("price", "should be integer");

					errors.should.deep.include.members([nameError, priceError]);
				});
		});

		it("should fail when the product to update is not found", function () {
			const productId = faker.random.uuid();

			return addRandomProduct()
				.then(({token, product}) => {
					return request(server)
						.put(`/api/products/${productId}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							price: 987,
						})
						.expect(404)
				})
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when the product to update is not found", function () {
			const productId = faker.random.uuid();

			return addRandomProduct()
				.then(({token, product}) => {
					return request(server)
						.put(`/api/products/${productId}`)
						.set("Authorization", `Bearer ${token}`)
						.send({
							...product,
							price: 987,
						})
						.expect(404)
				})
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(notFoundError());
				});
		});

		it("should fail when no token has been sent", function () {
			return addRandomProduct()
				.then(({product}) =>
					request(server)
						.put(`/api/products/${product.id}`)
						.send({
							...product,
							price: "Price as string",
							name:  465
						})
						.expect(401))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no token has been sent", function () {
			return addRandomProduct()
				.then(({product}) =>
					request(server)
						.put(`/api/products/${product.id}`)
						.send({
							...product,
							price: "Price as string",
							name:  465
						})
						.expect(401))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(unauthorizedAccess())
				});
		});

		it("should fail when token is valid but the token's user can't be found", function () {
			const validTokenForNonExistentUser = createJwt(getRandomUser());

			return addRandomProduct()
				.then(({product}) =>
					request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
						.send(getProduct())
						.expect(404))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when token is valid but the token's user can't be found", function () {
			const validTokenForNonExistentUser = createJwt(getRandomUser());

			return addRandomProduct()
				.then(({product}) =>
					request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
						.send(getProduct())
						.expect(404))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(userDoesNotExist());
				});
		});

		it("should fail when token does not match product owner", function () {
			let differentUserToken = "";

			return getUserToken()
				.then(token => differentUserToken = token)
				.then(() => addRandomProduct())
				.then(({product}) =>
					request(server)
						.put(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${differentUserToken}`)
						.send({
							...product,
							price: 987
						})
						.expect(403))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});
	});

	describe("DELETE /products/:productId", function () {
		it("should delete a product with the given id", function () {
			return addRandomProduct()
				.then(({token, product}) =>
					request(server)
						.delete(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${token}`)
						.expect(204))
		});

		it("should fail when the product to delete is not found", function () {
			const productId = faker.random.uuid();

			return getUserToken()
				.then(token =>
					request(server)
						.delete(`/api/products/${productId}`)
						.set("Authorization", `Bearer ${token}`)
						.expect(404))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				})
		});

		it("should provide a detailed error when the product to delete is not found", function () {
			const productId = faker.random.uuid();

			return getUserToken()
				.then(token =>
					request(server)
						.delete(`/api/products/${productId}`)
						.set("Authorization", `Bearer ${token}`)
						.expect(404))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(notFoundError());
				})
		});

		it("should fail when no token has been sent", function () {
			return addRandomProduct()
				.then(({product}) =>
					request(server)
						.delete(`/api/products/${product.id}`)
						.expect(401))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when no token has been sent", function () {
			return addRandomProduct()
				.then(({product}) =>
					request(server)
						.put(`/api/products/${product.id}`)
						.expect(401))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(unauthorizedAccess())
				});
		});

		it("should fail when token is valid but the token's user can't be found", function () {
			const validTokenForNonExistentUser = createJwt(getRandomUser());

			return addRandomProduct()
				.then(({product}) =>
					request(server)
						.delete(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
						.expect(404))
				.then(response => {
					const errors = response.body;

					errors.should.be.instanceOf(Array);
					errors.should.not.be.empty;
				});
		});

		it("should provide a detailed error when token is valid but the token's user can't be found", function () {
			const validTokenForNonExistentUser = createJwt(getRandomUser());

			return addRandomProduct()
				.then(({product}) =>
					request(server)
						.delete(`/api/products/${product.id}`)
						.set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
						.expect(404))
				.then(response => {
					const error = response.body[0];

					error.should.be.deep.equal(userDoesNotExist());
				});
		});
	});
});