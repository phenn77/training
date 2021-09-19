const express = require("express");

const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const artistRoute = require("./routes/artist");
const albumRoute = require("./routes/album");
const memberRoute = require("./routes/member");
const pictureRoute = require("./routes/picture");

const app = express();

const mongoDBUrl =
  "mongodb+srv://admin:admin@training.sw7hp.mongodb.net/training?retryWrites=true&w=majority";

mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(8080);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/user", userRoute);
    app.use("/artist", artistRoute);
    app.use("/album", albumRoute);
    app.use("/member", memberRoute);
    app.use("/picture", pictureRoute);

    app.use("/uploads", express.static("./uploads"));
  })
  .catch((err) => {
    console.log(err);
  });
