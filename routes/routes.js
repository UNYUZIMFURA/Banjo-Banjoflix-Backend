const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const {
  handle_Homepage,
  handleLogin,
  handleSignup,
} = require("../controllers/controllers");

router.route("/homepage").post(handle_Homepage);

router.route("/login").post(handleLogin);

router.route("/signup").post(handleSignup);

module.exports = router;
