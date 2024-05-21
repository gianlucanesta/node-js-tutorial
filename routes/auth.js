const User = require("../models/user");
const express = require("express");

const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email."),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long.")
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)
      .withMessage("Password must be alphanumeric."),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject(
            "The email address already exists, choose another one."
          );
        }
        return true;
      }),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long.")
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)
      .withMessage("Password must be alphanumeric."),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
