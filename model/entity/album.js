import mongoose, { model, Schema } from "mongoose";

const Tracklist = require("./tracklist");

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    releasedDate: {
      type: String,
      required: true,
    },
    status: String,
    rating: Number,
    tracklist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tracklist",
      },
    ],
    picture: {
      type: Schema.Types.ObjectId,
      ref: "Picture",
    },
  },
  { timestamps: true }
);

module.exports = model("Album", albumSchema);
