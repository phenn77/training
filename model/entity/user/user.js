const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {model, Schema} = mongoose;

var saltRounds = 10;

const userSchema = new Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            // required: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: String,
        birthday: {
            type: String,
            // required: true,
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

// hash user password before saving into database
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = model("User", userSchema);
