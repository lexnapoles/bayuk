import chai from "chai";
import request from "supertest";
import faker from "faker";
import jwt from "jsonwebtoken";
import stoppable from "stoppable";
import createServer from "../../server/server";
import db from "../../server/database/db";
import {global} from "../../server/database/sql/sql";
import {addUser as addUserService} from "../../server/api/services/users";
import {getUser} from "../../server/seeder/database/usersTableSeeder";
import {invalidUser, userAlreadyExists, loginFailed, userDoesNotExist} from "../../server/errors/api/userErrors";
import {unauthorizedAccess, tokenDoesNotMatch} from "../../server/errors/api/authorizationErrors";
import {dataNotFound, invalidId} from "../../server/errors/api/controllerErrors";
import {createJwt} from "../../server/api/services/authentication"

chai.should();

let server = {};

const addUser = data =>
  addUserService(data)
    .then(user => ({
      user,
      token: createJwt(user)
    }));

const userKeys = ["id", "name", "email", "latitude", "longitude", "image"];

describe("Users", function () {
  beforeEach(function () {
    server = stoppable(createServer(5000), 0);

    return db.none(global.truncateAll);
  });

  afterEach(function (done) {
    db.none(global.truncateAll);

    server.stop(done);
  });

  describe("POST /register", function () {
    it("should register a user", function () {
      const user = {
        email:     faker.internet.email(),
        name:      faker.name.findName(),
        password:  faker.internet.password(),
        latitude:  parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude())
      };

      return request(server)
        .post("/api/register")
        .send(user)
        .expect(201)
        .expect("Location", /\/api\/users\/.+/);
    });

    it("should return a valid jwt with user info when successfully registering a user", function () {
      return request(server)
        .post("/api/register")
        .send(getUser())
        .expect(201)
        .then(response => {
          const tokenPayload = jwt.verify(response.body, process.env.JWT_SECRET);

          tokenPayload.should.contain.all.keys(["id", "name", "email", "latitude", "longitude", "image"]);
        })
    });

    it("should fail when no data has been sent", function () {
      return request(server)
        .post("/api/register")
        .expect(400)
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(dataNotFound("body"));
        });
    });

    it("should fail when any of the required fields is not sent", function () {
      const user = {
        password:  faker.internet.password(),
        latitude:  parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude())
      };

      return request(server)
        .post("/api/register")
        .send(user)
        .expect(400)
        .then(response => {
          const errors     = response.body,
                emailError = invalidUser("User", "should have required property email"),
                nameError  = invalidUser("User", "should have required property name");

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          errors.should.deep.include.members([emailError, nameError]);
        });
    });

    it("should fail when there's already a user with the same email", function () {
      const user = getUser();

      return addUser(user)
        .then(() =>
          request(server)
            .post("/api/register")
            .send(user)
            .expect(409)
        )
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.deep.equal(userAlreadyExists());
        });
    });

  });

  describe("POST /login", function () {
    it("should login a user", function () {
      const user = getUser();

      return addUser(user)
        .then(() =>
          request(server)
            .post("/api/login")
            .send({
              email:    user.email,
              password: user.password
            })
            .expect(201)
            .expect("Location", /\/api\/users\/.+/))
    });

    it("should return a valid jwt with user info when successfully login a user", function () {
      const user = getUser();

      return addUser(user)
        .then(() =>
          request(server)
            .post("/api/login")
            .send({
              email:    user.email,
              password: user.password
            })
            .expect(201))
        .then(response => {
          const tokenPayload = jwt.verify(response.body, process.env.JWT_SECRET);

          tokenPayload.should.contain.all.keys(userKeys);
        });
    });

    it("should fail when no data has been sent", function () {
      return request(server)
        .post("/api/login")
        .expect(400)
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(dataNotFound("body"));
        });
    });

    it("should fail when any of the required fields is not sent", function () {
      const user = getUser();

      return request(server)
        .post("/api/login")
        .send({
          password: user.password
        })
        .expect(400)
        .then(response => {
          const errors     = response.body,
                error      = response.body[0],
                emailError = invalidUser("User", "should have required property email");

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(emailError);
        });
    });

    it("should fail if the user is not registered", function () {
      const user = getUser();

      return request(server)
        .post("/api/login")
        .send({
          email:    user.email,
          password: user.password
        })
        .expect(401)
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(loginFailed());
        })
    });

    it("should fail if any of the credentials is wrong", function () {
      const user              = getUser(),
            incorrectPassword = `Wrong ${user.password}`;

      return addUser(user)
        .then(() =>
          request(server)
            .post("/api/login")
            .send({
              email:    user.email,
              password: incorrectPassword
            })
            .expect(401))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(loginFailed());
        });
    });
  });

  describe("GET /users/:userId", function () {
    it("should get a user by the given id", function () {
      return addUser(getUser())
        .then(({user}) =>
          request(server)
            .get(`/api/users/${user.id}`)
            .expect(200))
        .then(response => {
          const user = response.body;

          user.should.include.all.keys(userKeys);
        })
    });

    it("should get selected fields", function () {
      const selectedFields = ["id", "name", "email"];

      return addUser(getUser())
        .then(({user}) =>
          request(server)
            .get(`/api/users/${user.id}`)
            .query({
              fields: selectedFields.join()
            })
            .expect(200))
        .then(response => {
          const user = response.body;

          user.should.have.all.deep.keys(selectedFields);
        });
    });

    it("should fail when the user id is not valid", function () {
      const userId = void 0;

      return request(server)
        .get(`/api/users/${userId}`)
        .expect(400)
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(invalidId());
        });
    });

    it("should fail if there's no user with the given id", function () {
      const nonExistentUser = faker.random.uuid();

      return request(server)
        .get(`/api/users/${nonExistentUser}`)
        .expect(404)
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(userDoesNotExist());
        });
    });
  });

  describe("PUT /users/:userId", function () {
    it("should modify the user", function () {
      const name = "New Name";

      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
              ...user,
              name
            })
            .expect(200))
        .then(response => {
          const user = response.body;

          user.should.include.all.keys(userKeys);

          user.name.should.be.equal(name);
        });
    });

    it("should modify the user image", function () {
      const image = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAcFBQYFBAcGBQYIBwcIChE
			LCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJCh
			QLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/w
			AARCAAXAB0DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQG/8QAIxAAAQMFAAICAwAA
			AAAAAAAAAQACEQMEEiExQVETImGRof/EABgBAAMBAQAAAAAAAAAAAAAAAAIDBgEF/8QAHREAAgICAwE
			AAAAAAAAAAAAAAAECAwQRBRJRQf/aAAwDAQACEQMRAD8AQNP7mIVr3wzsQFly+pJaOQ3flUV7ks1Oz0
			KZS2ccLq4AbA9SYS+pfMJGR/qmvXIBLRr17SmrlUdJdj+I4nxrTB6nW4yMna1KxXtOSXP5HR4QhJRov
			rAfIcSYIiUnurksuXMDSIjYPUIVLweLTlXyhdHaUd/fV4Gf/9k=`;

      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
              ...user,
              image
            })
            .expect(200))
        .then(response => {
          const user = response.body;

          user.should.include.all.keys(userKeys);

          user.image.should.exist;
        });
    });

    it("should fail when no data has been sent", function () {
      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(400))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(dataNotFound("body"));
        });
    });

    it("should fail when invalid data has been sent", function () {
      const invalidUserParams = {
        name:  453,
        image: []
      };

      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
              ...user,
              ...invalidUserParams
            })
            .expect(400))
        .then(response => {
          const errors     = response.body,
                nameError  = invalidUser("name", "should be string"),
                imageError = invalidUser("image", "should be null,string");

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          errors.should.deep.include.members([nameError, imageError]);
        });
    });

    it("should fail when the user is not found", function () {
      const randomUser = getUser({id: faker.random.uuid()});

      const validTokenForNonExistentUser = createJwt(randomUser);

      return addUser(getUser())
        .then(({user}) =>
          request(server)
            .put(`/api/users/${randomUser.id}`)
            .set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
            .send({
              ...user,
              name: "New Name"
            })
            .expect(404))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(userDoesNotExist());
        });
    });

    it("should fail when no token has been sent", function () {
      return addUser(getUser())
        .then(({user}) =>
          request(server)
            .put(`/api/users/${user.id}`)
            .send({
              ...user,
              name: "New Name"
            })
            .expect(401))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(unauthorizedAccess())
        });
    });

    it("should fail when the token does not match the userId", function () {
      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${faker.random.uuid}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
              ...user,
              name: "New Name"
            })
            .expect(403))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(tokenDoesNotMatch());
        });
    });
  });

  describe("PUT /users/:userId/email", function () {
    it("should change the user email", function () {
      const email = "new@email.com";

      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${user.id}/email`)
            .set("Authorization", `Bearer ${token}`)
            .send({email})
            .expect(200))
        .then(response => {
          const tokenPayload = jwt.verify(response.body, process.env.JWT_SECRET);

          tokenPayload.should.contain.all.keys(userKeys);
        });
    });

    it("should fail when no data has been sent", function () {
      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${user.id}/email`)
            .set("Authorization", `Bearer ${token}`)
            .expect(400))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(dataNotFound("body"));
        });
    });

    it("should fail when the user is not found", function () {
      const randomUser = getUser({id: faker.random.uuid()});

      const validTokenForNonExistentUser = createJwt(randomUser);

      return request(server)
        .put(`/api/users/${randomUser.id}/email`)
        .set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
        .send({email: "new@email.com"})
        .expect(404)
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(userDoesNotExist());
        });
    });

    it("should fail when no token has been sent", function () {
      return addUser(getUser())
        .then(({user}) =>
          request(server)
            .put(`/api/users/${user.id}/email`)
            .send({email: "new@email.com"})
            .expect(401))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(unauthorizedAccess())
        });
    });

    it("should fail when the token does not match the userId", function () {
      return addUser(getUser())
        .then(({token}) =>
          request(server)
            .put(`/api/users/${faker.random.uuid()}/email`)
            .set("Authorization", `Bearer ${token}`)
            .send({email: "new@email.com"})
            .expect(403))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(tokenDoesNotMatch())
        });
    });
  });

  describe("PUT /users/:userId/password", function () {
    it("should change the user password", function () {
      const password = "newPassword123";

      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${user.id}/password`)
            .set("Authorization", `Bearer ${token}`)
            .send({password})
            .expect(204));
    });

    it("should fail when no data has been sent", function () {
      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .put(`/api/users/${user.id}/password`)
            .set("Authorization", `Bearer ${token}`)
            .expect(400))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(dataNotFound("body"));
        });
    });

    it("should fail when the user is not found", function () {
      const randomUser = getUser({id: faker.random.uuid()});

      const validTokenForNonExistentUser = createJwt(randomUser);

      return request(server)
        .put(`/api/users/${randomUser.id}/password`)
        .set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
        .send({password: "newPassword123"})
        .expect(404)
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(userDoesNotExist());
        });
    });

    it("should fail when no token has been sent", function () {
      return addUser(getUser())
        .then(({user}) =>
          request(server)
            .put(`/api/users/${user.id}/password`)
            .send({password: "newPassword123"})
            .expect(401))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(unauthorizedAccess())
        });
    });

    it("should fail when the token does not match the userId", function () {
      return addUser(getUser())
        .then(({token}) =>
          request(server)
            .put(`/api/users/${faker.random.uuid()}/password`)
            .set("Authorization", `Bearer ${token}`)
            .send({password: "newPassword123"})
            .expect(403))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(tokenDoesNotMatch())
        });
    });
  });

  describe("DELETE /users/:userId", function () {
    it("should delete the user", function () {
      return addUser(getUser())
        .then(({user, token}) =>
          request(server)
            .delete(`/api/users/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204))
    });

    it("should fail if the user is not found", function () {
      const randomUser = getUser({id: faker.random.uuid()});

      const validTokenForNonExistentUser = createJwt(randomUser);

      return request(server)
        .delete(`/api/users/${randomUser.id}`)
        .set("Authorization", `Bearer ${validTokenForNonExistentUser}`)
        .expect(404);
    });

    it("should fail when no token has been sent", function () {
      return addUser(getUser())
        .then(({user}) =>
          request(server)
            .delete(`/api/users/${user.id}`)
            .expect(401))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(unauthorizedAccess())
        });
    });

    it("should fail when the token does not match the userId", function () {
      return addUser(getUser())
        .then(({token}) =>
          request(server)
            .delete(`/api/users/${faker.random.uuid()}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(403))
        .then(response => {
          const errors = response.body,
                error  = response.body[0];

          errors.should.be.instanceOf(Array);
          errors.should.not.be.empty;

          error.should.be.deep.equal(tokenDoesNotMatch())
        });
    });
  });
});

