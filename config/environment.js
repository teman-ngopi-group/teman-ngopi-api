require("dotenv").config();

switch (process.env.ENV) {
  case "development":
    hostDB = process.env.HOST_DB_DEV
    break;
  case "testing":
    hostDB = process.env.HOST_DB_TEST
    break;
  case "production":
    hostDB = process.env.HOST_DB_PROD
    break;
  default:
    throw new Error("ENV confoguration was not defined!");
}

module.exports = {
  //env connection and jwt
  PORT: process.env.PORT,
  HOST_DB: hostDB,
  ENV: process.env.ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};
