const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Artist = require("./artist");
const Member = require("./member");
const Album = require("./album");
const Single = require("./single");

const User = require("./user/user");

const pictureSchema = new Schema(
  {
    fileDirectory: {
      type: String,
      required: true,
    },
    for: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Artist", "Member", "Album", "Single", "User"],
    },
    currentlyUsed: Boolean,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = model("Picture", pictureSchema);
