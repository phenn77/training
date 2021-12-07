const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const albumSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        releaseYear: {
            type: String,
            required: true,
        },
        status: String,
        rating: Number,
        artist: {
            type: Schema.Types.ObjectId,
            ref: "Artist",
            required: true,
        },
        tracklist: {
            type: ['string'],
            required: true,
            validate: [(value) => value.length > 0, 'Album need to have tracklist']
        }
    },
    {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}}
);

albumSchema.virtual("pictures", {
    ref: "Picture",
    localField: "_id",
    foreignField: "for",
    match: {currentlyUsed: true},
});

module.exports = model("Album", albumSchema);
