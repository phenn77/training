const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Status = require("../enum/status");

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthday: Date,
    status: {
      type: String,
      enum: [Status],
    },
    summary: String,
    position: String,
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

memberSchema.virtual("pictures", {
  ref: "Picture",
  localField: "_id",
  foreignField: "for",
  match: { currentlyUsed: true },
});

module.exports = model("Member", memberSchema);
