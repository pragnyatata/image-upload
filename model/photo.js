const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  photoURL: {
    type: String,
    required: true,
    unique: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Photo", photoSchema);
