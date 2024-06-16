require("dotenv").config();

async function getExpect() {
  const expect = await import("chai").then((mod) => mod.expect);
  return expect;
}

const mongoose = require("mongoose");

const User = require("../models/user");

const FeedController = require("../controllers/feed");

describe("Feed controller", function () {
  before(function (done) {
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
      .then((result) => {
        done();
      });
  });

  beforeEach(function () {});

  afterEach(function () {});

  it("should add a created post to the posts of the creator", async function () {
    const req = {
      body: {
        title: "Test Post",
        content: "Test Content",
      },
      file: {
        path: "test-path",
      },
      userId: "5f0f5e5b9c7b0b0b0b0b0b0b",
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    await FeedController.createPost(req, res, () => {});

    const updatedUser = await User.findById(req.userId);

    const expect = await getExpect();
    expect(updatedUser).to.not.be.null;
    expect(updatedUser).to.have.property("posts");
    expect(updatedUser.posts).to.have.length(1);
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
