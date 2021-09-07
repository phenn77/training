const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const pictureSchema = new Schema(
  {
    url: String,
    name: String,
    type: String,
    status: String,
    currentlyUsed: Boolean,
    originalSize: {
      data: Buffer,
      contentType: String,
    },
    compressedSize: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Picture", pictureSchema);
