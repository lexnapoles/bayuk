import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";
import createServer from "../../server/server";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

chai.should();

let server = {};

describe("categories", function () {
	beforeEach(function () {
		server = createServer();
	});

	afterEach(function (done) {
		server.close(done);
	});

	it("should return a 200 status code in a successful response", function () {
		return chai
			.request(server)
			.get("/api/categories")
			.then(res => res.status)
			.should.eventually.equal(200);
	});

	it("should return an array", function () {
		return chai
			.request(server)
			.get("/api/categories")
			.then(res => res.body)
			.should.eventually.be.instanceOf(Array);
	});
});