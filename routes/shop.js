const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

// /shop/get-index => GET
router.get("/", shopController.getIndex);

// /shop/get-products => GET
router.get("/products", shopController.getProducts);

// /shop/get-product => GET
router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.post("/create-order", shopController.postOrder);

router.post("/cart", shopController.postCart);

router.get("/orders", shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
