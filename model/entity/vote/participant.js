import mongoose, { model, Schema } from "mongoose";

const participantSchema = new Schema(
  {
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    picture: {
      type: Schema.Types.ObjectId,
      ref: "Picture",
    },
  },
  { timestamps: true }
);

module.exports = model("Participant", participantSchema);
