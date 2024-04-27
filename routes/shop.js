const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("In shop.js", adminData.products);
  // res.sendFile("/views/shop.html", { root: __dirname + "../../" });
  // res.sendFile("/views/shop.html", { root: path.join(__dirname, "..") });
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
