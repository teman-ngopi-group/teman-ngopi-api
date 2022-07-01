const mongoose = require("mongoose");
const schema = mongoose.Schema;

const articleSchema = new schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false
    },
    admin_id: {
        type: schema.Types.ObjectId,
        ref: "admins",
        required: true,
    }
}, { timestamps: true });

const articleModel = mongoose.model('articles', articleSchema);
module.exports = articleModel;