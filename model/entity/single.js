const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Artist = require("./artist");
const Picture = require("./picture");

const singleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: String,
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

singleSchema.virtual("pictures", {
  ref: "Picture",
  localField: "_id",
  foreignField: "for",
  match: { currentlyUsed: true },
});

model.exports = model("Single", singleSchema);
