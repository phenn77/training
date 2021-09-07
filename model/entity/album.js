const mongoose = require("mongoose");
const Artist = require("../../model/entity/artist");

const { model, Schema } = mongoose;

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    releasedDate: {
      type: String,
      // required: true,
    },
    status: String,
    rating: Number,
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    tracklist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tracklist",
      },
    ],
    pictures: {
      type: Schema.Types.ObjectId,
      ref: "Picture",
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

module.exports = model("Album", albumSchema);
