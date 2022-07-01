const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventSchema = new schema({
    topic: {
        type: String,
        required: true
    },
    event_type_id: {
        type: schema.Types.ObjectId,
        ref: "event_types",
        required: true,
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    event_pic_id: {
        type: schema.Types.ObjectId,
        ref: "event_pics",
        required: true,
    },
    event_place_id: {
        type: schema.Types.ObjectId,
        ref: "event_places",
        required: true,
    },
    image_url: {
        type: String,
        required: true
    },
}, { timestamps: true });

const eventModel = mongoose.model('events', eventSchema);
module.exports = eventModel;