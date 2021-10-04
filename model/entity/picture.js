const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const pictureSchema = new Schema(
  {
    fileDirectory: {
      type: String,
      required: true,
    },
    for: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Artist", "Member", "Album", "Single", "User"],
    },
    currentlyUsed: Boolean,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

pictureSchema.virtual("artist", {
  ref: "Artist",
  localField: "for",
  foreignField: "_id",
});

module.exports = model("Picture", pictureSchema);
