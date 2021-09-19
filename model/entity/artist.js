const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Member = require("./member");
const Album = require("./album");
const Single = require("./single");
const Picture = require("./picture");

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    origin: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    summary: String,
    rating: Number,
    website: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

artistSchema.virtual("members", {
  ref: "Member",
  localField: "_id",
  foreignField: "artist",
});

artistSchema.virtual("albums", {
  ref: "Album",
  localField: "_id",
  foreignField: "artist",
});

artistSchema.virtual("singles", {
  ref: "Single",
  localField: "_id",
  foreignField: "artist",
});

artistSchema.virtual("pictures", {
  ref: "Picture",
  localField: "_id",
  foreignField: "for",
  match: { currentlyUsed: true },
});

module.exports = model("Artist", artistSchema);
