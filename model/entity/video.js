import mongoose, { model, Schema } from "mongoose";

const videoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    status: String,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Video", videoSchema);
