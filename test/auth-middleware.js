async function getExpect() {
  const expect = await import("chai").then((mod) => mod.expect);
  return expect;
}

const authMiddleware = require("../middleware/is-auth");

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
