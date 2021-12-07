const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const tracklistSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}}
);

module.exports = model("Tracklist", tracklistSchema);
