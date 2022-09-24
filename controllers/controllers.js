const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.handleLogin = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return next(new ErrorResponse("Fill all the fields!", 403));
  }
 
  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(new ErrorResponse("User not found!", 401));
  }

  const matchPasswords = await bcrypt.compare(password, user.password);

  if (!matchPasswords) {
    return next(new ErrorResponse("Incorrect Password Test!", 403));
  }
  sendTokenResponse(user, 200, res);
});

exports.handleSignup = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return next(new ErrorResponse("Fill all the fields"));
  }

  const userExist = await User.findOne({
    email,
  });

  if(userExist) {
    return next(new ErrorResponse("User with this email already exists, Login!"))
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hash,
  });
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getToken();
  const options = {
    expiresIn: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    message: "Token Sent",
  });
};
