const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    summary: String,
    rating: Number,
    website: String,
    album: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    member: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    picture: {
      type: Schema.Types.ObjectId,
      ref: "Picture",
    },
  },
  { timestamps: true }
);

module.exports = model("Artist", artistSchema);
