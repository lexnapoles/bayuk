/*
  eslint-disable
  no-unused-expressions,
  prefer-arrow-callback,
  import/no-extraneous-dependencies,
  func-names,
  no-tabs
 */

import chai from 'chai';
import request from 'supertest';
import faker from 'faker';
import stoppable from 'stoppable';
import parse from 'parse-link-header';
import { times } from 'lodash/util';
import createServer from '../../server/server';
import db from '../../server/database/db';
import { global } from '../../server/database/sql/sql';
import { addUser } from '../../server/api/services/users';
import { addProduct } from '../../server/api/services/products';
import transformProduct from '../../server/api/transformers/products';
import addCategories from '../../server/seeder/database/categoriesTableSeeder';
import { getUser as getRandomUser } from '../../server/seeder/database/usersTableSeeder';
import { cleanAllPreviouslyCreatedImages } from '../../server/seeder/filesystem/productsImagesSeeder';
import { productDoesNotExist, invalidProduct } from '../../server/errors/api/productErrors';
import { unauthorizedAccess, tokenDoesNotMatch } from '../../server/errors/api/authorizationErrors';
import { dataNotFound, invalidId } from '../../server/errors/api/controllerErrors';
import { createJwt } from '../../server/api/services/authentication';
import { userDoesNotExist } from '../../server/errors/api/userErrors';

chai.should();

let server = {};

const PORT = 5000;

const getProduct = () => ({
  name: 'Ray Ban sunglasses',
  description: 'Good as new, original Ray Ban sunglasses',
  category: 'Accessories',
  price: 50,
  images: [
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
			rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`,
  ],
});

const getUserToken = () =>
  addUser(getRandomUser())
    .then(createJwt);

const addRandomProduct = () => {
  let token = '';

  const req = {
    query: {},
    headers: { host: `127.0.0.1:${PORT}` },
    protocol: 'http',
  };

  return addUser(getRandomUser())
    .then((user) => {
      token = createJwt(user);

      return addProduct({
        owner: user.id,
        ...getProduct(),
      });
    })
    .then(createdProduct => ({
      token,
      product: transformProduct(req, createdProduct),
    }));
};

describe('Products', function () {
  beforeEach(function () {
    return cleanAllPreviouslyCreatedImages()
      .then(() => db.none(global.truncateAll))
      .then(() => addCategories())
      .then(() => { server = stoppable(createServer(PORT), 0); });
  });

  afterEach(function () {
    return cleanAllPreviouslyCreatedImages()
      .then(() => db.none(global.truncateAll))
      .then(() => server.stop());
  });

  describe('GET /products', function () {
    it('should get a paginated and sorted list of products', function () {
      const PRODUCTS_CREATED = 30;

      const filters = {
        sort: 'distance',
        sortOrder: 'ascending',
        radius: 9000,
        latitude: -72.2468,
        longitude: 81.4777,
      };

      return Promise.all(times(PRODUCTS_CREATED, addRandomProduct))
        .then(() =>
          request(server)
            .get('/api/products')
            .query(filters)
            .expect(200))
        .then((response) => {
          const products = response.body;

          products.should.not.have.lengthOf(0);
          products.length.should.be.below(PRODUCTS_CREATED);
        });
    });

    it('should get a link to fetch the next products', function () {
      const PRODUCTS_CREATED = 70;

      return Promise.all(times(PRODUCTS_CREATED, addRandomProduct))
        .then(() =>
          request(server)
            .get('/api/products')
            .query({
              sort: 'distance',
              sortOrder: 'descending',
              radius: 9999,
              latitude: -72.2468,
              longitude: 81.4777,
            })
            .expect(200)
            .expect('Link', /api\/products?(.*); rel="next"/));
    });

    it('should get the products by owner', function () {
      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .get('/api/products')
            .query({ owner: product.owner })
            .expect(200));
    });

    it('should get the products by owner and sold state', function () {
      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .get('/api/products')
            .query({
              owner: product.owner,
              sold: false,
            })
            .expect(200));
    });

    it('should not get a next link header when there aren\'t more products', function () {
      return request(server)
        .get('/api/products')
        .query({
          sort: 'distance',
          sortOrder: 'descending',
          radius: 9000,
          latitude: -72.2468,
          longitude: 81.4777,
        })
        .expect(200)
        .then(({ headers }) => headers.should.not.have.property('Link'));
    });

    it('should get the next products with the next link header', function () {
      const PRODUCTS_CREATED = 70;

      const filters = {
        sort: 'distance',
        sortOrder: 'descending',
        radius: 9000,
        latitude: -72.2468,
        longitude: 81.4777,
      };

      return Promise.all(times(PRODUCTS_CREATED, addRandomProduct))
        .then(() =>
          request(server)
            .get('/api/products')
            .query(filters)
            .expect(200))
        .then(({ headers }) => {
          const nextLink = parse(decodeURI(headers.link)).next;

          return request('')
            .get(nextLink.url)
            .expect(200);
        })
        .then((response) => {
          const products = response.body;

          products.length.should.be.below(PRODUCTS_CREATED);
        });
    });

    it('should get selected fields', function () {
      const selectedFields = ['id', 'name', 'price'];

      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .get('/api/products')
            .query({
              owner: product.owner,
              fields: selectedFields.join(),
            })
            .expect(200))
        .then((response) => {
          const product = response.body[0];

          product.should.have.all.deep.keys(selectedFields);
        });
    });

    it('should get only the valid fields of the selected ones', function () {
      const validFields = ['id', 'name'];
      const invalidFields = ['pirce', 'descr'];

      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .get('/api/products')
            .query({
              owner: product.owner,
              fields: [...validFields, ...invalidFields].join(),
            })
            .expect(200))
        .then((response) => {
          const product = response.body[0];

          product.should.have.all.deep.keys(validFields);
        });
    });

    it('should get the entire product if the fields query is empty', function () {
      const ALL_PRODUCT_KEYS = ['id', 'name', 'description', 'images', 'price', 'owner', 'createdAt', 'category', 'sold', 'latitude', 'longitude'];

      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .get('/api/products')
            .query({
              owner: product.owner,
              fields: '',
            })
            .expect(200))
        .then((response) => {
          const product = response.body[0];

          product.should.have.all.deep.keys(ALL_PRODUCT_KEYS);
        });
    });

    it('should fail if sorting by price or distance doesn\'t have the obligatory keys',
      function () {
        const invalidFilters = {
          sort: 'price',
          sortOrder: 'ascending',
          radius: 9000,
        };

        return request(server)
          .get('/api/products')
          .query(invalidFilters)
          .expect(400)
          .then((response) => {
            const [latitudeError, longitudeError] = response.body;

            latitudeError.should.be.deep.equal(dataNotFound('latitude'));
            longitudeError.should.be.deep.equal(dataNotFound('longitude'));
          });
      });
  });

  describe('GET /products/:productId', function () {
    it('should get a product by the given id', function () {
      let productId = '';

      return addRandomProduct()
        .then(({ product }) => {
          productId = product.id;
        })
        .then(() =>
          request(server)
            .get(`/api/products/${productId}`)
            .expect(200))
        .then((response) => {
          const product = response.body;

          product.should.be.instanceOf(Object);
          product.should.contain.all.keys([
            'id',
            'name',
            'description',
            'images',
            'owner',
            'category',
            'createdAt',
            'price',
            'sold',
          ]);
          product.should.have.property('id').equal(productId);
        });
    });

    it('should get selected fields', function () {
      const selectedFields = ['id', 'name', 'price'];

      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .get(`/api/products/${product.id}`)
            .query({
              fields: selectedFields.join(),
            })
            .expect(200))
        .then((response) => {
          const product = response.body;

          product.should.have.all.deep.keys(selectedFields);
        });
    });

    it('should fail when the product id is not valid', function () {
      const productId = undefined;

      return request(server)
        .get(`/api/products/${productId}`)
        .expect(400)
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(invalidId());
        });
    });

    it('should fail if there\'s no product with the given id', function () {
      const nonExistentProduct = faker.random.uuid();

      return request(server)
        .get(`/api/products/${nonExistentProduct}`)
        .expect(404)
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(productDoesNotExist());
        });
    });
  });

  describe('POST /products', function () {
    it('should add a product', function () {
      const product = {
        name: 'Ray Ban sunglasses',
        description: 'Good as new, original Ray Ban sunglasses',
        category: 'Accessories',
        price: 50,
        images: [
          `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAcFBQYFBAcGBQYIBwcIChE
					LCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJCh
					QLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/w
					AARCAAXAB0DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQG/8QAIxAAAQMFAAICAwAA
					AAAAAAAAAQACEQMEEiExQVETImGRof/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBgEF/8QAHREAAgICAwE
					AAAAAAAAAAAAAAAECAwQRBRJRQf/aAAwDAQACEQMRAD8AQNP7mIVr3wzsQFly+pJaOQ3flUV7ks1Oz0
					KZS2ccLq4AbA9SYS+pfMJGR/qmvXIBLRr17SmrlUdJdj+I4nxrTB6nW4yMna1KxXtOSXP5HR4QhJRov
					rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`,
        ],
      };

      return getUserToken()
        .then(token =>
          request(server)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send(product)
            .expect(201)
            .expect('Location', /\/api\/products\/.+/))
        .then((response) => {
          const newProduct = response.body;

          newProduct.should.contain.all.keys([
            'id',
            'name',
            'description',
            'images',
            'owner',
            'category',
            'createdAt',
            'price',
            'sold',
          ]);
        });
    });

    it('should fail when no data has been sent', function () {
      return getUserToken()
        .then(token =>
          request(server)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .expect(400))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(dataNotFound('body'));
        });
    });

    it('should fail when any of the required fields is not sent', function () {
      const product = {
        name: 'Ray Ban sunglasses',
        description: 'Good as new, original Ray Ban sunglasses',
        category: 'Accessories',
      };

      return getUserToken()
        .then(token =>
          request(server)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send(product)
            .expect(400))
        .then((response) => {
          const errors = response.body;
          const priceError = invalidProduct('Product', 'should have required property price');
          const imagesError = invalidProduct('Product', 'should have required property images');

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          errors.should.deep.include.members([priceError, imagesError]);
        });
    });

    it('should fail when invalid data has been sent', function () {
      return getUserToken()
        .then(token =>
          request(server)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
              ...getProduct(),
              name: 234,
              price: '50',
            })
            .expect(400))
        .then((response) => {
          const errors = response.body;
          const nameError = invalidProduct('name', 'should be string');
          const priceError = invalidProduct('price', 'should be integer');

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          errors.should.deep.include.members([nameError, priceError]);
        });
    });

    it('should fail when no token has been sent', function () {
      return request(server)
        .post('/api/products')
        .send(getProduct())
        .expect(401)
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(unauthorizedAccess());
        });
    });

    it('should fail when token is valid but the user can\'t be found', function () {
      const validTokenForNonExistentUser = createJwt(getRandomUser({ id: faker.random.uuid() }));

      return request(server)
        .post('/api/products')
        .set('Authorization', `Bearer ${validTokenForNonExistentUser}`)
        .send(getProduct())
        .expect(404)
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(userDoesNotExist());
        });
    });
  });

  describe('PUT /products/:productId', function () {
    it('should update a product', function () {
      return addRandomProduct()
        .then(({ token, product }) => request(server)
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...product,
            price: 987,
            description: 'Updated product description',
          })
          .expect(200))
        .then((response) => {
          const product = response.body;

          product.should.contain.all.keys([
            'id',
            'name',
            'description',
            'images',
            'owner',
            'category',
            'createdAt',
            'price',
            'sold',
          ]);
        });
    });

    it('should update the images of a product', function () {
      const images = [getProduct().images[0]];
      let oldImages = [];

      return addRandomProduct()
        .then(({ token, product }) => {
          oldImages = product.images;

          return request(server)
            .put(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              ...product,
              images,
            })
            .expect(200);
        })
        .then((response) => {
          const { images: productImages } = response.body;

          productImages.length.should.not.be.equal(oldImages.length);
          productImages.should.be.lengthOf(1);
          productImages.should.not.include.members(oldImages);
        });
    });

    it('should delete the old images and add the new ones', function () {
      const base64Image = getProduct().images[0];
      let oldImagesIds = [];

      return addRandomProduct()
        .then(({ token, product }) => {
          oldImagesIds = product.images;

          return request(server)
            .put(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              ...product,
              images: [base64Image],
            })
            .expect(200);
        })
        .then((response) => {
          const { images } = response.body;

          images.should.be.lengthOf(1);
          images.should.not.have.members(oldImagesIds);
        });
    });

    it('should maintain the old images when they are included', function () {
      const base64Image = getProduct().images[0];
      let oldImagesIds = [];

      return addRandomProduct()
        .then(({ token, product }) => {
          oldImagesIds = product.images;

          return request(server)
            .put(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              ...product,
              images: [...oldImagesIds, base64Image],
            })
            .expect(200);
        })
        .then((response) => {
          const { images } = response.body;

          images.should.include.members(oldImagesIds);
        });
    });

    it('should delete the old images that are not included', function () {
      let oldImagesIds = [];

      return addRandomProduct()
        .then(({ token, product }) => {
          oldImagesIds = product.images;

          return request(server)
            .put(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              ...product,
              images: [oldImagesIds[0]],
            })
            .expect(200);
        })
        .then((response) => {
          const { images } = response.body;
          const deletedImage = oldImagesIds[1];


          images.should.not.include(deletedImage);
        });
    });

    it('should fail when no product has been sent', function () {
      return addRandomProduct()
        .then(({ token, product }) => request(server)
          .put(`/api/products/${product.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(400))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(dataNotFound('body'));
        });
    });

    it('should fail when invalid data has been sent', function () {
      const invalidProductParams = {
        price: 'Price as string',
        name: 465,
      };

      return addRandomProduct()
        .then(({ token, product }) =>
          request(server)
            .put(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              ...product,
              ...invalidProductParams,
            })
            .expect(400))
        .then((response) => {
          const errors = response.body;
          const nameError = invalidProduct('name', 'should be string');
          const priceError = invalidProduct('price', 'should be integer');

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          errors.should.deep.include.members([nameError, priceError]);
        });
    });

    it('should fail when the product to update is not found', function () {
      const productId = faker.random.uuid();

      return addRandomProduct()
        .then(({ token, product }) => request(server)
          .put(`/api/products/${productId}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...product,
            price: 987,
          })
          .expect(404))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(productDoesNotExist());
        });
    });

    it('should fail when no token has been sent', function () {
      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .put(`/api/products/${product.id}`)
            .send({
              ...product,
              price: 'Price as string',
              name: 465,
            })
            .expect(401))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(unauthorizedAccess());
        });
    });

    it('should fail when token is valid but the token\'s user can\'t be found', function () {
      const validTokenForNonExistentUser = createJwt(getRandomUser({ id: faker.random.uuid() }));

      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .put(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${validTokenForNonExistentUser}`)
            .send(getProduct())
            .expect(404))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(userDoesNotExist());
        });
    });

    it('should fail when token does not match product owner', function () {
      let differentUserToken = '';

      return getUserToken()
        .then((token) => {
          differentUserToken = token;
        })
        .then(() => addRandomProduct())
        .then(({ product }) =>
          request(server)
            .put(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${differentUserToken}`)
            .send({
              ...product,
              price: 987,
            })
            .expect(403))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(tokenDoesNotMatch());
        });
    });
  });

  describe('DELETE /products/:productId', function () {
    it('should delete a product with the given id', function () {
      return addRandomProduct()
        .then(({ token, product }) =>
          request(server)
            .delete(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204));
    });

    it('should fail when the product to delete is not found', function () {
      const productId = faker.random.uuid();

      return getUserToken()
        .then(token =>
          request(server)
            .delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(productDoesNotExist());
        });
    });

    it('should fail when no token has been sent', function () {
      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .delete(`/api/products/${product.id}`)
            .expect(401))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(unauthorizedAccess());
        });
    });

    it('should fail when token is valid but the token\'s user can\'t be found', function () {
      const validTokenForNonExistentUser = createJwt(getRandomUser({ id: faker.random.uuid() }));

      return addRandomProduct()
        .then(({ product }) =>
          request(server)
            .delete(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${validTokenForNonExistentUser}`)
            .expect(404))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(userDoesNotExist());
        });
    });

    it('should fail when token does not match product owner', function () {
      let differentUserToken = '';

      return getUserToken()
        .then((token) => {
          differentUserToken = token;
        })
        .then(() => addRandomProduct())
        .then(({ product }) =>
          request(server)
            .delete(`/api/products/${product.id}`)
            .set('Authorization', `Bearer ${differentUserToken}`)
            .expect(403))
        .then((response) => {
          const errors = response.body;
          const error = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(tokenDoesNotMatch());
        });
    });
  });
});
