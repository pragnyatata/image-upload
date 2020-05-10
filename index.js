const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Photo = require("./model/photo");
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
}).single("Image");
const app = express();
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost/image-upload", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connected"));

app.get("/", (req, res) => {
  res.send("hello bhai");
});
app.post("/uploadImage/:imageName", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      const host = req.hostname;
      console.log(req.protocol);
      console.log(req.file);
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
});
app.get("/listImages", (req, res) => {
  Photo.find().exec((err, data) => {
    if (err) return res.status(400).json({ error: err });
    res.json(data[0]._id);
  });
});
app.get("/image/:id", function (req, res) {
  Photo.findById(req.params.id, function (err, data) {
    if (err) return res.status(400).json({ error: err });
    res.json(data.photoURL);
  });
});
const port = 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
