const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gender = {
  MALE: "male",
  FEMALE: "female"
}

const usersSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d/.test(v);
      },
      message: (props) => `${props.value} is not valid phone number`,
    },
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: [gender.MALE, gender.FEMALE],
      message: "Please select gender male or female"
    }
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  }
}, {
  timestamps: true
});

const UsersModel = mongoose.model("users", usersSchema);

module.exports = UsersModel;
