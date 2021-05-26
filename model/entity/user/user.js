const mongoose = require("mongoose");

const {model, Schema} = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: String,
    birthday: {
      type: Date,
      required: true,
    },
    type: String,
    userReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserReview",
      },
    ],
    userFavorite: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserFavorite",
      },
    ],
    userVote: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserVote",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
