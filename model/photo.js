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
  multerImageName: {
    type: String,
    required: true,
    unique: true,
  },
  resizedImages: [
    {
      URL: String,
      height: Number,
      width: Number,
    },
  ],
});

module.exports = mongoose.model("Photo", photoSchema);
