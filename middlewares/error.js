const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `User not found of ${req.params.id}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "Email already exists!";
    error = new ErrorResponse(message, 403);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 400).json({
    success: false,
    message: error.message || "Server Error",
  });
};

module.exports = errorHandler;
