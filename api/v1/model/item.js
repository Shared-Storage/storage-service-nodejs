const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  organizationId: {
    type: String,
    required: true,
  },
  locationId: {
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
  tags: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("Item", itemSchema);
