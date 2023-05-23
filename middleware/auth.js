const ErrorHandler = require("../utils/errorhandler");
const catchasyncError = require("./catchasyncError");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchasyncError(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return next(new ErrorHandler("Plaese Login to access this Resource", 401));
  }
  // console.log(token);

  const decodedData = JWT.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
