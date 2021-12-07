const mongoose = require("mongoose");

const {model, Schema} = mongoose;

const videoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        status: String,
        rating: Number,
    },
    {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}}
);

module.exports = model("Video", videoSchema);
