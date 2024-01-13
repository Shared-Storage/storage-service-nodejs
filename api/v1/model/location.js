const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  organizationId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Location", locationSchema);
