const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /shop/get-index => GET
router.get("/", shopController.getIndex);

// /shop/get-products => GET
router.get("/products", shopController.getProducts);

// /shop/get-product => GET
router.get("/products/:productId", shopController.getProduct);

// shop/cart => GET
router.get("/cart", isAuth, shopController.getCart);

// shop/cart => POST
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

// shop/order => POST
router.post("/create-order", isAuth, shopController.postOrder);

// shop/cart => POST
router.post("/cart", isAuth, shopController.postCart);

// shop/orders => GET
router.get("/orders", isAuth, shopController.getOrders);

// shop/checkout => GET
router.get("/checkout", isAuth, shopController.getCheckout);

// shop/checkout/success => GET
router.get("/checkout/success", isAuth, shopController.getCheckoutSuccess);

// shop/checkout/cancel => GET
router.get("/checkout/cancel", isAuth, shopController.getCheckout);

// shop/invoice => GET
router.get("/orders/:orderId", isAuth, shopController.getInvoice);

module.exports = router;
