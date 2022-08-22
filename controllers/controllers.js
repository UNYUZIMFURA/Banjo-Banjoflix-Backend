const jwt = require("jsonwebtoken");

exports.handle_Homepage = (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(403).json({
      message: "Provide an email",
    });
  }
};

exports.handleSignup_1 = (req, res) => {
  const password = req.body.password;
  if (!password) {
    res.status(403).json({
      message: "Provide password",
    });
  }
};

exports.handlePlan = (req, res) => {
  const plan = req.body.plan;
  if (!plan) {
    res.status(403).json({
      message: "Select a plan!",
    });
  }
};

exports.start_Membership = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(403).json({
      message: "Fill all the fields",
    });
  }

  sendTokenResponse();
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getToken();
  const options = {
    expiresIn: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie(token).json({
    message: "Success in Cookie Setting!",
  });
  
};

const getToken = () => {
  jwt.sign(
    {
      id: user._id,
    },

    process.env.SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};
