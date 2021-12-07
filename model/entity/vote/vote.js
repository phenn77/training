import mongoose, {model, Schema} from "mongoose";

const voteSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        participant: [
            {
                type: Schema.Types.ObjectId,
                ref: "Participant",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model("Vote", voteSchema);
