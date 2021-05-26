import mongoose, { model, Schema } from "mongoose";

const tracklistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

module.exports = model("Tracklist", tracklistSchema);
