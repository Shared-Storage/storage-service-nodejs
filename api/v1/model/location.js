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
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Location", locationSchema);
