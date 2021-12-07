import mongoose, {model, Schema} from "mongoose";

const userVoteSchema = new Schema(
    {
        artist: {
            type: Schema.Types.ObjectId,
            ref: "Artist",
        },
        picture: {
            type: Schema.Types.ObjectId,
            ref: "Picture",
        },
        campaign: {
            type: Schema.Types.ObjectId,
            ref: "Vote",
        },
    },
    {timestamps: true}
);

module.exports = model("UserVote", userVoteSchema);
