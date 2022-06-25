const hashPassword = require("./password/hash");
const comparedPassword = require("./password/compared");
const generateToken = require("./token/token");
const { errorResponse, errorParams, successResponse } = require("./response/response");

module.exports = {
  hashPassword: hashPassword,
  comparedPassword: comparedPassword,
  generateToken: generateToken,
  errorResponse: errorResponse,
  successResponse: successResponse,
  errorParams: errorParams
};
