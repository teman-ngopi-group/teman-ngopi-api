const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventPlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
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

const EventPlacesModel = mongoose.model("event_places", eventPlaceSchema);

module.exports = EventPlacesModel;
