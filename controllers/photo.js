const Photo = require("../model/photo");
const port = process.env.PORT || 8000;
const resizeImage = require("../heplers/resize");
const { upload } = require("../heplers/multerUpload");
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
        multerImageName: req.file.filename,
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
  Photo.findById(req.params.id, (err, data) => {
    if (err) return res.status(400).json({ error: err });
    const height = req.params.height;
    const width = req.params.width;
    const imageData = data.resizedImages;
    let resizedURL;
    if (imageData.length >= 1) {
      imageData.map((obj) => {
        if (obj.height == height && obj.width == width) resizedURL = obj.URL;
      });
    }
    if (resizedURL) {
      res.status(200).json({ URL: resizedURL });
    }

    if (!resizedURL) {
      const imgName = height + width + data.multerImageName;
      const filePath = `./public/upload/${data.multerImageName}`;
      resizeImage(height, width, filePath);
      const newImage = {
        URL:
          req.protocol +
          "://" +
          req.hostname +
          ":" +
          port +
          "\\upload\\" +
          imgName,
        height: height,
        width: width,
      };
      resizedURL = newImage.URL;
      imageData.push(newImage);
      data.save((err) => {
        if (err) return res.status(400).json({ error: err });
        res.status(200).json({ URL: resizedURL });
      });
    }
  });
};
