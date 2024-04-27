const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.sendFile("/views/shop.html", { root: __dirname + "../../" });
  // res.sendFile("/views/shop.html", { root: path.join(__dirname, "..") });
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
});

module.exports = router;
