const mongoose = require("mongoose");
const { model, Schema } = mongoose;

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

module.exports = model("Single", singleSchema);
