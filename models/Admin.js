const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const role = {
    ADMIN: "admin",
    SUPER_ADMIN: "super_admin"
}

const gender = {
    MALE: "male",
    FEMALE: "female"
}

const admminSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
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
    role: {
        type: String,
        enum: {
        values: [role.ADMIN, role.SUPER_ADMIN],
        message: "Please select role admin or super_admin"
        }
    }
}, { timestamps: true});

const AdminModel = mongoose.model("admins", admminSchema);

module.exports = AdminModel;