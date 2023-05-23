const ErrorHandler = require("../utils/errorhandler");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongodb Id Error
  if (err.name === 'CastError') {
     const message = `Resource not found. Invalid ${err.path}`
     err = new ErrorHandler(message, 400)
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  //Wrong JWT error
  if (err.code === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }
  //Wrong EXPIRE error
  if (err.code === "TokenExpiredError") {
    const message = `Json Web Token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }



  res.status(err.statusCode).json({
    success: false,
    // error: err,
    message: err.message,
    // error: err.stack,  //to get exact line of error
  });
};

module.exports = errorHandler;
