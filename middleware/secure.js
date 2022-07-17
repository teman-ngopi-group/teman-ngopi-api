const { UserModel, AdminModel } = require("../models");

const { JWT_SECRET_KEY } = require("../config");
const { errorResponse, errorMiddlewareHandle, plainCipherToken } = require("../helpers");
const jwt = require("jsonwebtoken");
const status = require("http-status");

let result = {};

module.exports = {
    authenticationGeneral: async (req, res, next) => {
        try {
            const plainToken = plainCipherToken(req.headers["authorization"]);
            const findUserToken = await UserModel.findOne({ token: plainToken });

            jwt.verify(plainToken, JWT_SECRET_KEY);

            if (!findUserToken || findUserToken.token != plainToken) {
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
            const plainToken = plainCipherToken(req.headers["authorization"]);
            const findUserToken = await AdminModel.findOne({ token: plainToken });

            const tokenHashed = jwt.verify(plainToken, JWT_SECRET_KEY);

            if (!findUserToken || findUserToken.token != plainToken) {
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