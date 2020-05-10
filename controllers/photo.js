const Photo = require("../model/photo");
const multer = require("multer");
const path = require("path");
const port = 8000;

const storage = multer.diskStorage({
  destination: "./public/upload/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".png"
    ) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
}).single("Image");

exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      const host = req.hostname;
      const filePath =
        req.protocol +
        "://" +
        host +
        ":" +
        port +
        "\\upload\\" +
        req.file.filename;
      const photo = new Photo({
        photoURL: filePath,
        imageName: req.params.imageName,
      });
      photo.save((err, data) => {
        if (err) return res.status(400).json({ error: err });
        res.status(200).json({ data });
      });
    }
  });
};
exports.listImages = (req, res) => {
  Photo.find().exec((err, data) => {
    if (err) return res.status(400).json({ error: err });
    res.json(
      data.map((dt) => {
        return dt._id;
      })
    );
  });
};
exports.getImageURL = (req, res) => {
  Photo.findById(req.params.id, function (err, data) {
    if (err) return res.status(400).json({ error: err });
    res.json(data.photoURL);
  });
};
