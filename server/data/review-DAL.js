import mongoose from 'mongoose';
import userReviewSchema from '../../models/UserReview.js';

// Use mongodb service name in Docker, localhost for tests
const mongoHost = process.env.MONGO_HOST || 'localhost';
const uri = `mongodb://admin:admin@${mongoHost}:27017/reviewdb?authSource=admin`;

const UserReview = mongoose.model('UserReview', userReviewSchema, 'reviews');

async function addReview(review) {
    await mongoose.connect(uri);
    const addedItem = new UserReview(review);
    const result = await addedItem.save();
    await mongoose.disconnect();
    return result;
}

async function removeReview(id) {
    await mongoose.connect(uri);
    const removedItem = await UserReview.findByIdAndDelete(id).exec();
    await mongoose.disconnect();
    return removedItem;
}

async function updateReview(id, updatedReview) {
    await mongoose.connect(uri);
    const result = await UserReview.findByIdAndUpdate(id, updatedReview, { new: true });
    await mongoose.disconnect();
    return result;
}

async function getAllReviewsByUser(userID) {
    await mongoose.connect(uri);
    const listOfReviews = await UserReview.find({ 'userID': userID }).exec();
    await mongoose.disconnect();
    return listOfReviews;
}

async function getAllReviewsByMovie(movieID) {
    await mongoose.connect(uri);
    const listOfReviews = await UserReview.find({ 'movieID': movieID }).exec();
    console.log(listOfReviews)
    await mongoose.disconnect();
    return listOfReviews;
}

async function getAllMovieReviewsByRating(movieID, rating) {
    await mongoose.connect(uri);
    var listOfReviews;
    if (isInt(rating)) {
        listOfReviews = await UserReview.find({ 'rating': { $gte: rating, $lte: rating + 1 }, 'movieID': movieID }).exec();
    } else {
        listOfReviews = await UserReview.find({ 'rating': rating, 'movieID': movieID }).exec();
    }
    await mongoose.disconnect();
    return listOfReviews;
}

async function getAllUserReviewsByRating(userID, rating) {
    await mongoose.connect(uri);
    var listOfReviews;
    if (isInt(rating)) {
        listOfReviews = await UserReview.find({ 'rating': { $gte: rating, $lte: rating + 1 }, 'userID': userID }).exec();
    } else {
        listOfReviews = await UserReview.find({ 'rating': rating, 'userID': userID }).exec();
    }
    await mongoose.disconnect();
    return listOfReviews;
}

async function addReviewForUser(allData) {
    await mongoose.connect(uri);
    const newReview = new UserReview({
        'userID': allData.userID,
        'content': allData.reviewText,
        'movieID': allData.movieID,
        'rating': allData.rating,
        'thumbsDown': 0,
        'thumbsUp': 0,
    });
    const result = await newReview.save();
    await mongoose.disconnect();
    return result._id;
}

async function updateReviewForUser(allData) {
    await mongoose.connect(uri);
    const result = await UserReview.updateOne({ 'userID': allData.userID }, {
        'content': allData.content,
        'rating': allData.rating,
        'username': allData.username,
        'title': allData.title,
    }).exec();
    await mongoose.disconnect();
    return result.acknowledged;
}

async function rateReview(reviewID, isPositive) {
    await mongoose.connect(uri);
    var result;
    if (isPositive) {
        result = await UserReview.updateOne({ '_id': reviewID }, { $inc: { thumbsUp: 1 } }).exec();
    } else {
        result = await UserReview.updateOne({ '_id': reviewID }, { $inc: { thumbsDown: 1 } }).exec();
    }
    await mongoose.disconnect();
    return result.acknowledged;
}

async function deleteReview(reviewID) {
    await mongoose.connect(uri);
    const result = await UserReview.findByIdAndDelete(reviewID).exec();
    await mongoose.disconnect();
    return result !== null;
}

function isInt(n) {
    return n % 1 === 0;
}

export {
    addReview,
    removeReview,
    updateReview,
    getAllReviewsByUser,
    getAllReviewsByMovie,
    getAllMovieReviewsByRating,
    getAllUserReviewsByRating,
    addReviewForUser,
    updateReviewForUser,
    rateReview,
    deleteReview
};