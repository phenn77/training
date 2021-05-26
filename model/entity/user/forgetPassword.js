import mongoose, { model, Schema } from "mongoose";

const forgetPasswordSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    oldPassword: {
      type: String,
      required: true,
    },
    newPassword: {
      type: String,
      required: true,
    },
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("ForgetPassword", forgetPasswordSchema);
