import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        userID: { type: String, required: true },
        username: { type: String, default: "Reviewer Name" },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const userReviewSchema = new Schema(
    {
        userID: { type: String, required: true },
        movieID: { type: String, required: true },
        username: String,
        title: String,
        content: String,
        rating: { type: Number, required: true },

        likedBy: [{ type: String }],
        dislikedBy: [{ type: String }],
        comments: [commentSchema],
    },
    { timestamps: true }
);

export default userReviewSchema;
