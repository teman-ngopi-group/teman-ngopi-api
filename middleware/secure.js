const { UserModel, AdminModel } = require("../models");

const { JWT_SECRET_KEY } = require("../config");
const { errorResponse, errorMiddlewareHandle } = require("../helpers");
const jwt = require("jsonwebtoken");
const status = require("http-status");

let result = {};

module.exports = {
    authenticationGeneral: async (req, res, next) => {
        try {
            const tokenHeader = req.headers["authorization"];
            const findUserToken = await UserModel.findOne({ token: tokenHeader });

            jwt.verify(tokenHeader, JWT_SECRET_KEY);

            if (!findUserToken || findUserToken.token != tokenHeader) {
                result.status = status.UNAUTHORIZED;
                result.message = "Token is not match with any users";
                return errorResponse(req, res, result);
            }
            
            return next();
        } catch (error) {
            errorMiddlewareHandle(req, res, next, error);
        }
    },
    authenticationAdmin: async (req, res, next) => {
        try {
            const tokenHeader = req.headers["authorization"];
            const findUserToken = await AdminModel.findOne({ token: tokenHeader });

            const tokenHashed = jwt.verify(tokenHeader, JWT_SECRET_KEY);

            if (!findUserToken || findUserToken.token != tokenHeader) {
                result.status = status.UNAUTHORIZED;
                result.message = "Token is not match with any users";
                return errorResponse(req, res, result);
            }

            if (tokenHashed.role != "admin" || findUserToken.role != "admin") {
                result.status = status.UNAUTHORIZED;
                result.message = "This endpoint just can be used for admin";
                return errorResponse(req, res, result);
            }

            return next();
        } catch (error) {
            errorMiddlewareHandle(req, res, next, error);
        }
    }
};