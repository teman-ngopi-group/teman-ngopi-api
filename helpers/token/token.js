const { JWT_SECRET_KEY } = require("../../config");
const Jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const { full_name, email, role } = user;
  const token = Jwt.sign({ full_name, email, role }, JWT_SECRET_KEY);

  return token;
};

module.exports = generateToken;
