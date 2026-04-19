import mongoose from 'mongoose';
const { Schema } = mongoose;

//mongoose schema definition, as to assist with data protection

const userReviewSchema = new Schema({
    userID: Number,
    movieID: String,
    username: String,
    title: String,
    content: String,
    rating: Number,
    thumbsUp: Number,
    thumbsDown: Number,
});

export default userReviewSchema