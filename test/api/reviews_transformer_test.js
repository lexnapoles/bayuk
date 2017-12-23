/*
  eslint-disable
  no-unused-expressions,
  prefer-arrow-callback,
  import/no-extraneous-dependencies,
  func-names,
  no-tabs
 */

import chai from 'chai';
import transformReview, { extractIncludeFields } from '../../server/api/transformers/reviews';

chai.should();

const review = {
  id: 1,
  source: '07778ec9-e448-49f3-8250-78301f865d5d',
  target: '06548ec9-e448-49f3-8250-78301f865d5d',
  rating: 5,
  description: 'Great seller',
  product: '61a71082-a00d-44af-b99c-5e10f7cf4878',
  created_at: '2017-03-23 13:46:41.327',
};

const transformedReview = {
  id: 1,
  source: '07778ec9-e448-49f3-8250-78301f865d5d',
  target: '06548ec9-e448-49f3-8250-78301f865d5d',
  rating: 5,
  description: 'Great seller',
  product: '61a71082-a00d-44af-b99c-5e10f7cf4878',
  createdAt: '2017-03-23 13:46:41.327',
};

describe.only('review transformer', function () {
  it('should transform a review', function () {
    const req = { query: {} };

    transformReview(req, review).should.be.deep.equal(transformedReview);
  });

  it('should extract the include fields', function () {
    const includeFields = ['targetUser', 'sourceUser'];

    const req = {
      query: {
        include: includeFields.toString(),
      },
    };

    extractIncludeFields(req).should.be.deep.equal(includeFields);
  });

  it('should not embed additional fields if invalid include fields are used', function () {
    const includeFields = ['invalid1', 'invalid2'];

    const req = {
      query: {
        include: includeFields.toString(),
      },
    };

    transformReview(req, review).should.be.deep.equal(transformedReview);
  });

  it('should accept an object defining how to get the data from the include fields ', function () {
    const field = 'targetUser';
    const data = 'data';
    const includeFields = [field];

    const req = {
      query: {
        include: includeFields.toString(),
      },
    };

    const accessors = {
      [field]: () => data,
    };

    const reviewWithTargetUser = {
      ...transformedReview,
      [field]: data,
    };

    return transformReview(req, review, accessors)
      .then(transformedReviewWithTargetUser =>
        transformedReviewWithTargetUser.should.be.deep.equal(reviewWithTargetUser));
  });
});
