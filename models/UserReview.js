import mongoose from 'mongoose';
const { Schema } = mongoose;

//mongoose schema definition, as to assist with data protection

const userReviewSchema = new Schema({
    userID: {type: Number, required: true},
    movieID: {type: String, required: true},
    username: String,
    title: String,
    content: String,
    rating: {type: Number, required: true},
    thumbsUp: Number,
    thumbsDown: Number,
});

export default userReviewSchema;