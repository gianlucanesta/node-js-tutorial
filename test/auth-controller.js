require("dotenv").config();

async function getExpect() {
  const expect = await import("chai").then((mod) => mod.expect);
  return expect;
}

const mongoose = require("mongoose");

const sinon = require("sinon");

const User = require("../models/user");

const AuthController = require("../controllers/auth");

describe("Auth controller - LOGIN", function () {
  it("should throw an error if accessing the database fails", async function () {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "a@a.com",
        password: "1234",
      },
    };

    AuthController.login(req, {}, () => {}).then((result) => {
      // console.log("result:", result);
      const expect = getExpect();

      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      // done()
    });

    User.findOne.restore();
  });

  it("should send a response with a valid user status for an existing user", async function (done) {
    mongoose
      .connect(process.env.MONGODB_URI_TEST)
      .then((result) => {
        const user = new User({
          email: "a@a.com",
          password: "1234",
          name: "name",
          posts: [],
          _id: "5f0f5e5b9c7b0b0b0b0b0b0b",
        });
        return user.save();
      })
      .then(() => {
        const req = {
          userId: "5f0f5e5b9c7b0b0b0b0b0b0b",
        };
        const res = {
          statusCode: 500,
          userStatus: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.userStatus = data.status;
          },
        };

        AuthController.getStatus(req, res, () => {}).then(() => {
          const expect = getExpect();
          expect(res.statusCode).to.be.equal(200);
          expect(res.userStatus).to.be.equal("I am new!");
          done();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
