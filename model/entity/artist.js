const mongoose = require("mongoose");
const Album = require("../../model/entity/album");

const { model, Schema } = mongoose;

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
    summary: String,
    rating: Number,
    website: String,
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    pictures: {
      type: Schema.Types.ObjectId,
      ref: "Picture",
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

module.exports = model("Artist", artistSchema);
