const { UserModel } = require("../models");
const config = require("../config");
const jwt = require("jsonwebtoken");
const roles = {
  Admin: "admin",
  User: "user",
};

let objErr = {};

module.exports = {
  grantAll: async (req, res, next) => {
    try {
      const tokenHeader = req.headers["bearer"];
      const decodedToken = jwt.verify(tokenHeader, config.JWT_SECRET_KEY);

      const findUserToken = await UserModel.findOne({ token: tokenHeader });

      if (!findUserToken || findUserToken.token != tokenHeader) {
        objErr.status = 401;
        objErr.message = "Token is not match with any users";
        return handleError(req, res, objErr);
      }

      return next();
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  grantOnlyAdmin: async (req, res, next) => {
    try {
      const tokenHeader = req.headers["bearer"];
      const decodedToken = jwt.verify(tokenHeader, config.JWT_SECRET_KEY);

      const findUserToken = await UserModel.findOne({ token: tokenHeader });

      if (!findUserToken || findUserToken.token != tokenHeader) {
        objErr.status = 400;
        objErr.message = "Token is not match with any users";
        return handleError(req, res, objErr);
      }

      if (findUserToken.role != roles.Admin) {
        objErr.status = 401;
        objErr.message = "Only admin can access this endpoint";
        return handleError(req, res, objErr);
      }

      return next();
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
};

const handleError = (req, res, objErr) => {
  let timestamp = new Date();

  res
    .status(objErr.status)
    .json({
      timestamp: timestamp,
      status: objErr.status,
      message: objErr.message,
      path: req.originalUrl,
    })
    .end();
};
