const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventTypeSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true } );

const EventTypesModel = mongoose.model("event_pics", eventTypeSchema);

module.exports = EventTypesModel;