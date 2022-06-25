const connection = require("./connection");
const {
  PORT,
  JWT_SECRET_KEY,
} = require("./environment");

module.exports = {
  connectDB: connection,
  PORT: PORT,
  JWT_SECRET_KEY: JWT_SECRET_KEY,
};
