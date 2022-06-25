const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isExpired: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true } );

const TokenModel = mongoose.model("token", tokenSchema);

module.exports = TokenModel;
