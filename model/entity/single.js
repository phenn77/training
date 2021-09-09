const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Artist = require("./artist");

const singleSchema = new Schema(
  {
    name: {
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

model.exports = model("Single", singleSchema);
