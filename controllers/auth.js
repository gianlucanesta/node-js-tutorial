const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("6643cb823e3f150a87cb2bd8")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })

    .catch((err) => console.log(err));
};
