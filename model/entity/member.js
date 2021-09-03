const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthday: Date,
    status: String,
    summary: String,
    position: String,
    rating: Number,
    picture: {
      type: Schema.Types.ObjectId,
      ref: "Picture",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Member", memberSchema);
