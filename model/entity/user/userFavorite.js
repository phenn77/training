import mongoose, {model, Schema} from "mongoose";

const userFavoriteSchema = new Schema(
    {
        status: String,
        artist: {
            type: Schema.Types.ObjectId,
            ref: "Artist",
        },
        album: {
            type: Schema.Types.ObjectId,
            ref: "Album",
        },
        member: {
            type: Schema.Types.ObjectId,
            ref: "Member",
        },
        tracklist: {
            type: Schema.Types.ObjectId,
            ref: "Tracklist",
        },
        picture: {
            type: Schema.Types.ObjectId,
            ref: "Picture",
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("UserFavorite", userFavoriteSchema);
