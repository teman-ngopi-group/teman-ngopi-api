const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventAttendanceSchema = new schema({
    clock_in: {
        type: Date,
        required: true
    },
    user_id: {
        type: schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    event_id: {
        type: schema.Types.ObjectId,
        ref: "events",
        required: true,
    },
}, { timestamps: true });

const eventAttendanceModel = mongoose.model('event_attendances', eventAttendanceSchema);
module.exports = eventAttendanceModel;