const { UserModel, AdminModel } = require("../../../models");
const { 
  comparedPassword, 
  errorResponse,
  errorParams,
  successResponse, 
  hashPassword, 
  generateToken,
  generateCipherToken
} = require("../../../helpers");
const status = require("http-status");
const { validationResult } = require("express-validator");

let result = {};

module.exports = {
  userLogin: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return errorParams(req, res, errors.array());
      
      await UserModel.findOne({ email: req.body.email }).then(async (user) => {
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

        if (!user.is_active) {
          result.status = status.UNAUTHORIZED;
          result.message = "User not activated, please verify the user's email first";
          return errorResponse(req, res, result);
        }

        //Successfully validation
        let { full_name, token } = user;
        token = await generateCipherToken(token);

        result = {
          status: status.OK,
          message: "Login succesfully",
          data: { full_name, token },
        }

        return successResponse(req, res, status.OK, result)
      });
    } catch (error) {
      next(error);
    }
  },
  userRegister: async (req, res, next) => {
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
      const { full_name, email } = userRegistration;

      result = { 
        data: { full_name, email }, 
        message: "User successfully created"
      };

      return successResponse(req, res, status.CREATED, result)
    } catch (error) {
      next(error);
    }
  },
  adminRegister: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return errorParams(req, res, errors.array());

      //Check if email already used
      const adminCheckEmail = await AdminModel.findOne({ email: req.body.email });

      if (adminCheckEmail) {
        result.status = status.BAD_REQUEST;
        result.message = `Admin with email ${req.body.email} already used`;
        return errorResponse(req, res, result);
      }

      const payloadGenToken = {...req.body, role: 'admin'};
      const hasPass = await hashPassword(req.body.password);
      const genToken = await generateToken(payloadGenToken);

      //Continue registration process
      const adminRegistration = await AdminModel.create({
        ...req.body,
        password: hasPass,
        token: genToken,
        role: 'admin',
      });
      const { full_name, email } = adminRegistration;

      result = {
        data: { full_name, email }, 
        message: "Admin successfully created"
      };

      return successResponse(req, res, status.CREATED, result)
    } catch (error) {
      next(error);
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return errorParams(req, res, errors.array());
      
      await AdminModel.findOne({ email: req.body.email }).then(async (admin) => {
        if (!admin) {
          result.status = status.BAD_REQUEST;
          result.message = `Admin with email ${req.body.email} not found`;
          return errorResponse(req, res, result);
        }

        const comparePass = await comparedPassword(
          req.body.password,
          admin.password
        );

        if (!comparePass) {
          result.status = status.UNAUTHORIZED;
          result.message = "The password that entered was incorrect";
          return errorResponse(req, res, result);
        }

        if (!admin.is_active) {
          result.status = status.UNAUTHORIZED;
          result.message = "Admin not activated, please verify the admin's email first";
          return errorResponse(req, res, result);
        }

        //Successfully validation
        let { full_name, token } = admin;
        token = await generateCipherToken(token);

        result = {
          status: status.OK,
          message: "Login succesfully",
          data: { full_name, token },
        }

        return successResponse(req, res, status.OK, result)
      });
    } catch (error) {
      next(error);
    }
  }
};
