const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.sendFile("/views/shop.html", { root: __dirname + "../../" });
  // res.sendFile("/views/shop.html", { root: path.join(__dirname, "..") });
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
