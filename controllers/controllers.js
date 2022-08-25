const jwt = require("jsonwebtoken");
const User = require('../models/User')
const bcrypt = require('bcrypt')
const asyncHandler = require('../middlewares/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')

exports.handle_Homepage = asyncHandler(async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(403).json({
      message: "Provide an Email!",
    });
    return;
  }

  sendTokenResponse()
});

exports.handleLogin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(403).json({
      message: "Fill all the fields!",
    });
    return;
  }
  sendTokenResponse();
});

exports.handleSignup = asyncHandler(async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (!email || !password) {
    res.status(403).json({
      message: "Fill all the fields",
    });
    return
  }
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({
    email,
    password
  })
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user,statusCode, res) => {
  const token = user.getToken()
  console.log(token)

  const options = {
    expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      message: "Token Sent"
    })
}
