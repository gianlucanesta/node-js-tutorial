const express = require("express");

const router = express.Router();

router.put("/signup", (req, res, next) => {
  res.send({ message: "Signup" });
});

router.post("/login", (req, res, next) => {
  res.send({ message: "Login" });
});

module.exports = router;
