async function getExpect() {
  const expect = await import("chai").then((mod) => mod.expect);
  return expect;
}
const sinon = require("sinon");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/is-auth");

describe("Auth middleware", function () {
  it("should throw an error if no authorization header is present", async function () {
    const expect = await getExpect();

    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should throw an error if the authorization header is only one string", async function () {
    const expect = await getExpect();
    const req = {
      get: function (headerName) {
        return "abc";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should throw an error if the token can not be verified", async function () {
    const expect = await getExpect();
    const req = {
      get: function (headerName) {
        return "Bearer 123";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yeald the userId after decoding the token", async function () {
    const expect = await getExpect();
    const req = {
      get: function (headerName) {
        return "Bearer akjhkjhakjh";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({
      userId: "abc",
    });
    // jwt.verify = function () {
    //   return { userId: "abc" };
    // };
    authMiddleware(req, {}, () => {});

    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
