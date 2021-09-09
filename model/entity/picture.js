const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Artist = require("./artist");
const Member = require("./member");
const Album = require("./album");

const pictureSchema = new Schema(
  {
    url: String,
    by: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Artist", "Member", "Album"],
    },
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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = model("Picture", pictureSchema);
