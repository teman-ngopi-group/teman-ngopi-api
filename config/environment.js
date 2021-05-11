require("dotenv").config();

module.exports = {
  //env connection and jwt
  PORT: process.env.PORT,
  HOST_DB: process.env.HOST_DB,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  //env user test credential
  TEST_ADMIN_NAME: process.env.TEST_ADMIN_NAME,
  TEST_ADMIN_PSW: process.env.TEST_ADMIN_PSW,
  TEST_ADMIN_EMAIL: process.env.TEST_ADMIN_EMAIL,
  TEST_ADMIN_PHONENUMBER: process.env.TEST_ADMIN_PHONENUMBER,
  TEST_ADMIN_ROLE: process.env.TEST_ADMIN_ROLE,
};
