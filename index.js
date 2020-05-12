require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const photoRoutes = require("./routes/photo");

const app = express();
mongoose
  .connect("mongodb://localhost/image-upload", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connected"));
app.use(express.static("public"));
app.use("/", photoRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
