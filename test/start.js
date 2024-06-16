async function getExpect() {
  const expect = await import("chai").then((mod) => mod.expect);
  return expect;
}

it("should add numbers correctly", async function () {
  const expect = await getExpect();
  const num1 = 1;
  const num2 = 1;
  expect(num1 + num2).to.equal(2);
});

it("should not give a result of 6", async function () {
  const expect = await getExpect();
  const num1 = 1;
  const num2 = 1;
  expect(num1 + num2).not.to.equal(6);
});
