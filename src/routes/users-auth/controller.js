const { UserModel } = require("../../../models");
const { 
  comparedPassword, 
  errorResponse,
  errorInternalHandle,
  errorParams,
  successResponse, 
  hashPassword, 
  generateToken 
} = require("../../../helpers");
const status = require("http-status");
const { validationResult } = require("express-validator");

let result = {};

module.exports = {
  userLogin: async (req, res) => {
    try {
      await UserModel.findOne({
        email: req.body.email,
      }).then(async (user) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return errorParams(req, res, errors.array());

        if (!user) {
          result.status = status.BAD_REQUEST;
          result.message = `User with email ${req.body.email} not found`;
          return errorResponse(req, res, result);
        }

        const comparePass = await comparedPassword(
          req.body.password,
          user.password
        );

        if (!comparePass) {
          result.status = status.UNAUTHORIZED;
          result.message = "The password that entered was incorrect";
          return errorResponse(req, res, result);
        }

        //Successfully validation
        const { full_name, email, token } = user;

        result = {
          status: status.OK,
          message: "Login succesfully",
          data: { full_name, email, token },
        }

        return successResponse(req, res, status.OK, result)
      });
    } catch (error) {
      return errorInternalHandle(req, res, error);
    }
  },
  userRegister: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return errorParams(req, res, errors.array());

      //Check if email already used
      const userCheckEmail = await UserModel.findOne({ email: req.body.email });

      if (userCheckEmail) {
        result.status = status.BAD_REQUEST;
        result.message = `User with email ${req.body.email} already used`;
        return errorResponse(req, res, result);
      }

      const payloadGenToken = {...req.body, role: 'user'};
      const hasPass = await hashPassword(req.body.password);
      const genToken = await generateToken(payloadGenToken);

      //Continue registration process
      const userRegistration = await UserModel.create({
        ...req.body,
        password: hasPass,
        token: genToken,
      });
      const { _id, full_name, email } = userRegistration;

      result = { 
        data: { _id, full_name, email }, 
        message: `User successfully created with id ${userRegistration._id}`
      };

      return errorInternalHandle(req, res, status.CREATED, result)
    } catch (error) {
      return errorHandle(req, res, error);
    }
  },
};
