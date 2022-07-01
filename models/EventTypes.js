const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true } );

const EventTypesModel = mongoose.model("event_types", eventTypeSchema);

module.exports = EventTypesModel;