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
  source_id: '07778ec9-e448-49f3-8250-78301f865d5d',
  target_id: '06548ec9-e448-49f3-8250-78301f865d5d',
  rating: 5,
  description: 'Great seller',
  product_id: '61a71082-a00d-44af-b99c-5e10f7cf4878',
  created_at: '2017-03-23 13:46:41.327',
};

const transformedReview = {
  id: 1,
  sourceId: '07778ec9-e448-49f3-8250-78301f865d5d',
  targetId: '06548ec9-e448-49f3-8250-78301f865d5d',
  rating: 5,
  description: 'Great seller',
  productId: '61a71082-a00d-44af-b99c-5e10f7cf4878',
  createdAt: '2017-03-23 13:46:41.327',
};

describe('review transformer', function () {
  it('should transform a review', async function () {
    const req = { query: {} };

    const data = await transformReview(req, review);

    data.should.be.deep.equal(transformedReview);
  });

  it('should extract the include fields', function () {
    const includeFields = ['target', 'source'];

    const req = {
      query: {
        include: includeFields.toString(),
      },
    };

    extractIncludeFields(req).should.be.deep.equal(includeFields);
  });

  it('should not embed additional fields if invalid include fields are used', async function () {
    const includeFields = ['invalid1', 'invalid2'];

    const req = {
      query: {
        include: includeFields.toString(),
      },
    };

    const data = await transformReview(req, review);

    data.should.be.deep.equal(transformedReview);
  });

  it('should accept an object defining how to get the embedded fields', async function () {
    const field = 'target';
    const includeFields = [field];

    const req = {
      query: {
        include: includeFields.toString(),
      },
    };

    const accessors = {
      [field]: () => 'data',
    };

    const data = await transformReview(req, review, accessors);

    data.should.be.deep.equal({
      ...transformedReview,
      target: 'data',
    });
  });

  it('should embed source and target', async function () {
    const includeFields = ['target', 'source'];

    const req = {
      query: {
        include: includeFields.toString(),
      },
    };

    const accessors = {
      target: () => 'target',
      source: () => 'source',
    };

    const data = await transformReview(req, review, accessors);

    data.should.be.deep.equal({
      ...transformedReview,
      target: 'target',
      source: 'source',
    });
  });
});
