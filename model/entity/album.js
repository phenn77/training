const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Artist = require("./artist");

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: String,
      required: true,
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
        type: [String],
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

albumSchema.virtual("pictures", {
  ref: "Picture",
  localField: "_id",
  foreignField: "by",
  match: { currentlyUsed: true },
});

albumSchema.path("tracklist").validate((data) => {
  return data != null || data.length !== 0;
}, "Album need to have tracklist");

module.exports = model("Album", albumSchema);
