import { Router } from "express";
import { body } from "express-validator";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/requireAuth";
import { validateRequest } from "../../middlewares/validate-request-handler";

const { signup_Controller } = require("./controllers/signup_Controller");
const { signin_Controller } = require("./controllers/signin_Controller");
const { signout_Controller } = require("./controllers/signout_Controller");

const {
  currentuser_Controller,
} = require("./controllers/currentuser_Controller");
const router = Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("Password Length between 8-16"),
  ],
  validateRequest,
  signup_Controller
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password").trim().notEmpty().withMessage("Password Must not Empty"),
  ],
  validateRequest,
  signin_Controller
);

router.get("/signout", signout_Controller);

router.get("/currentuser", currentUser, requireAuth, currentuser_Controller);

module.exports = router;
