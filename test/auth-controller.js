async function getExpect() {
  const expect = await import("chai").then((mod) => mod.expect);
  return expect;
}

const sinon = require("sinon");

const User = require("../models/user");

const AuthController = require("../controllers/auth");

describe("Auth controller - LOGIN", function () {
  it("should throw an error if accessing the database fails", async function () {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const expect = await getExpect();

    expect(AuthController.login);

    User.findOne.restore();
  });
});
