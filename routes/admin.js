const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  isAuth,
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long."),
    body("price").isFloat().withMessage("Please enter a valid price."),
    body("description")
      .isString()
      .isLength({ min: 5, max: 400 })
      .withMessage("Description must be at least 5 characters long."),
  ],
  adminController.postAddProduct
);

// /admin/edit-product => GET
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

// /admin/edit-product => POST
router.post(
  "/edit-product",
  isAuth,
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long."),
    body("imageUrl").isURL().withMessage("Please enter a valid URL."),
    body("price").isFloat().withMessage("Please enter a valid price."),
    body("description")
      .isString()
      .isLength({ min: 5, max: 400 })
      .withMessage("Description must be at least 5 characters long."),
  ],
  adminController.postEditProduct
);

// /admin/delete-product => POST
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
