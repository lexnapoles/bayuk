/*
  eslint-disable
  no-unused-expressions,
  prefer-arrow-callback,
  import/no-extraneous-dependencies,
  func-names,
  no-tabs
 */

import chai from "chai";
import { extractFields } from "../../server/api/transformers/transformer";

chai.should();

describe("transformer", function() {
  it("should extract the required fields", function() {
    const includeFields = ["targetUser", "sourceUser"];

    const req = {
      query: {
        include: includeFields.toString()
      }
    };

    const extractedFields = extractFields(req, "include");

    extractedFields.should.be.deep.equal(includeFields);
  });
});
