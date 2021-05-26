const express = require("express");

const mongoose = require("mongoose");

const userRoute = require("./routes/user");

const app = express();

const mongoDBUrl =
  "mongodb+srv://admin:admin@training.sw7hp.mongodb.net/training?retryWrites=true&w=majority";

mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);

    app.use("/user", userRoute);
  })
  .catch((err) => {
    console.log(err);
  });
