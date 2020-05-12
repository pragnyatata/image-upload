const express = require("express");
const router = express.Router();
const {
  uploadImage,
  listImages,
  getImageURL,
} = require("../controllers/photo");
router.post("/uploadImage/:imageName", uploadImage);
router.get("/listImages", listImages);
router.get("/image/:id/:height/:width", getImageURL);
module.exports = router;
