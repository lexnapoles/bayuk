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
import createServer from '../../server/server';
import db from '../../server/database/db';
import { global } from '../../server/database/sql/sql';
import { addUser } from '../../server/api/services/users';
import { addReview } from '../../server/api/services/reviews';
import addCategories from '../../server/seeder/database/categoriesTableSeeder';
import { addProduct } from '../../server/api/services/products';
import invalidReview from '../../server/errors/api/reviewErrors';
import { unauthorizedAccess } from '../../server/errors/api/authorizationErrors';
import { userDoesNotExist } from '../../server/errors/api/userErrors';
import { dataNotFound, invalidId } from '../../server/errors/api/controllerErrors';
import { getUser } from '../../server/seeder/database/usersTableSeeder';
import { createJwt } from '../../server/api/services/authentication';
import { cleanAllPreviouslyCreatedImages } from '../../server/seeder/filesystem/productsImagesSeeder';

chai.should();

let server = {};

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

const generateReviewData = () => {
  let usersData = {};

  return Promise.all([addUser(getUser()), addUser(getUser())])
    .then(([sourceUser, targetUser]) => {
      usersData = {
        source: {
          user: sourceUser,
          token: createJwt(sourceUser),
        },
        target: {
          user: targetUser,
          token: createJwt(targetUser),
        },
      };
    })
    .then(() => addProduct({
      ...product,
      owner: usersData.target.user.id,
    }))
    .then(data => ({
      ...usersData,
      productId: data.id,
    }));
};

const addRandomReview = () =>
  generateReviewData()
    .then(({ source, target, productId }) => addReview({
      rating: 5,
      description: faker.lorem.sentences(),
      sourceId: source.user.id,
      targetId: target.user.id,
      productId,
    }));

describe('Reviews', function () {
  beforeEach(function () {
    return cleanAllPreviouslyCreatedImages()
      .then(() => db.none(global.truncateAll))
      .then(() => addCategories())
      .then(() => {
        server = stoppable(createServer(5000), 0);
      });
  });

  afterEach(function () {
    return cleanAllPreviouslyCreatedImages()
      .then(() => db.none(global.truncateAll))
      .then(() => server.stop());
  });

  describe('GET /reviews/:userId', function () {
    it('should get the user reviews', function () {
      return addRandomReview()
        .then(({ target_id }) =>
          request(server)
            .get(`/api/reviews/${target_id}`)
            .expect(200))
        .then((response) => {
          const reviews = response.body;
          const review = response.body[0];

          reviews.should.be.instanceOf(Array);
          reviews.should.not.be.empty;

          review.should.include.all.keys(['id', 'rating', 'description', 'sourceId', 'targetId', 'productId']);
        });
    });

    it('should show only selected fields', function () {
      const selectedFields = ['rating', 'sourceId', 'targetId'];

      return addRandomReview()
        .then(({ target_id }) =>
          request(server)
            .get(`/api/reviews/${target_id}`)
            .query({
              fields: selectedFields.join(),
            })
            .expect(200))
        .then((response) => {
          const review = response.body[0];

          review.should.have.all.deep.keys(selectedFields);
        });
    });

    it('should embed included users', function () {
      const source = 'source';
      const target = 'target';

      return addRandomReview()
        .then(({ target_id }) =>
          request(server)
            .get(`/api/reviews/${target_id}`)
            .query({
              include: [source, target].join(),
            })
            .expect(200))
        .then((response) => {
          const review = response.body[0];

          review.should.have.property(source);
          review.should.have.property(target);
        });
    });

    it('should embed included product', function () {
      return addRandomReview()
        .then(({ target_id }) =>
          request(server)
            .get(`/api/reviews/${target_id}`)
            .query({
              include: 'product',
            })
            .expect(200))
        .then((response) => {
          const review = response.body[0];

          review.should.have.property('product');

          const { product: reviewedProduct } = review;

          reviewedProduct.should.include.all.keys([
            'id', 'name', 'images', 'owner', 'description',
            'category', 'createdAt', 'price', 'latitude',
            'longitude', 'sold']);
        });
    });

    it('should fail when the user id is not valid', function () {
      const userId = undefined;

      return request(server)
        .get(`/api/reviews/${userId}`)
        .expect(400)
        .then((response) => {
          const error = response.body[0];

          error.should.be.deep.equal(invalidId());
        });
    });
    it('should fail if there\'s no user with the given id', function () {
      return request(server)
        .get(`/api/reviews/${faker.random.uuid()}`)
        .expect(404);
    });
  });

  describe('POST /reviews', function () {
    it('should add a new review', function () {
      return generateReviewData()
        .then(({ source, target, productId }) => {
          const { user: { id: buyerId }, token } = source;
          const { user: { id: sellerId } } = target;

          return request(server)
            .post('/api/reviews')
            .set('Authorization', `Bearer ${token}`)
            .send({
              sourceId: buyerId,
              targetId: sellerId,
              rating: 4,
              description: 'Good seller, product in good condition',
              productId,
            })
            .expect(201)
            .expect('Location', `/api/reviews/${sellerId}`);
        })
        .then((response) => {
          const review = response.body;

          review.should.include.all.keys(['id', 'rating', 'description', 'sourceId', 'targetId', 'productId']);
        });
    });

    it('should fail when no data has been sent', function () {
      return generateReviewData()
        .then(({ source }) => {
          const { token } = source;

          return request(server)
            .post('/api/reviews')
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
        })
        .then((response) => {
          const error = response.body[0];

          error.should.be.deep.equal(dataNotFound('body'));
        });
    });

    it('should fail when invalid data has been sent', function () {
      return generateReviewData()
        .then(({ source, productId }) => {
          const { user: { id: buyerId }, token } = source;

          return request(server)
            .post('/api/reviews')
            .set('Authorization', `Bearer ${token}`)
            .send({
              sourceId: buyerId,
              targetId: 'Invalid seller',
              rating: 'A rating',
              description: 'Good seller',
              productId,
            })
            .expect(400);
        })
        .then((response) => {
          const errors = response.body;
          const ratingError = invalidReview('rating', 'should be integer');
          const targetError = invalidReview('targetId', 'should match format "uuid"');

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          errors.should.deep.include.members([ratingError, targetError]);
        });
    });

    it('should fail when no token has been sent', function () {
      return request(server)
        .post('/api/reviews')
        .expect(401)
        .then((response) => {
          const error = response.body[0];

          error.should.be.deep.equal(unauthorizedAccess());
        });
    });

    it('should fail when token is valid but the user can\'t be found', function () {
      const validTokenForNonExistentUser = createJwt(getUser({ id: faker.random.uuid() }));

      return request(server)
        .post('/api/reviews')
        .set('Authorization', `Bearer ${validTokenForNonExistentUser}`)
        .expect(404)
        .then((response) => {
          const error = response.body[0];

          error.should.be.deep.equal(userDoesNotExist());
        });
    });

    it('should fail when the token user is not the one to write the review', function () {
      return generateReviewData()
        .then(({ source, target, productId }) => {
          const { token } = source;
          const { user: { id: sellerId } } = target;

          return request(server)
            .post('/api/reviews')
            .set('Authorization', `Bearer ${token}`)
            .send({
              targetId: sellerId,
              sourceId: faker.random.uuid(),
              rating: 4,
              description: 'Good seller, product in good condition',
              productId,
            })
            .expect(401);
        })
        .then((response) => {
          const error = response.body[0];

          error.should.be.deep.equal(unauthorizedAccess());
        });
    });
  });
});
