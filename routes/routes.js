const express = require("express");
const router = express.Router();

const {
  handleLogin,
  handleSignup,
} = require("../controllers/controllers");

router.route("/login").post(handleLogin);

router.route("/signup").post(handleSignup);

module.exports = router;
