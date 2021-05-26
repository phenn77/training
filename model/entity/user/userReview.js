import mongoose, { model, Schema } from "mongoose";

const userReviewSchema = new Schema(
  {
    summary: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    status: String,
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
    tracklist: {
      type: Schema.Types.ObjectId,
      ref: "Tracklist",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("UserReview", userReviewSchema);
