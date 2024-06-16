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
    mongoose.connect(process.env.MONGODB_URI_TEST).then((result) => {
      const user = new User({
        email: "a@a.com",
        password: "1234",
        name: "name",
        posts: [],
      }).catch((err) => {
        console.log(err);
      });
    });
  });
});
