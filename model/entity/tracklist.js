const mongoose = require("mongoose");

const { model, Schema } = mongoose;

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
