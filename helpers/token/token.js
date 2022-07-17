const { JWT_SECRET_KEY, JWT_CRYPTO_KEY } = require("../../config");
const Jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");

const generateToken = async (user) => {
  const { full_name, email, role } = user;
  const token = Jwt.sign({ full_name, email, role }, JWT_SECRET_KEY);

  return token;
};

const generateCipherToken = async (token) => {
  return CryptoJs.AES.encrypt(token, JWT_CRYPTO_KEY).toString();
};

const plainCipherToken = (token) => {
  return CryptoJs.AES.decrypt(token, JWT_CRYPTO_KEY).toString(CryptoJs.enc.Utf8);
};

module.exports = { generateCipherToken, generateToken, plainCipherToken };
