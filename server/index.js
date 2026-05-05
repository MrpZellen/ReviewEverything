const { addReviewForUser, updateReviewForUser, deleteReview, getAllReviewsByMovie, getAllReviewsByUser, getAllMovieReviewsByRating,
    getAllUserReviewsByRating, rateReview} = require('./data/review-DAL');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 'isServingJSON': true })
})

app.get('/user/reviews', async (req, res) => {
    const userID = req.query.userID
    const result = await getAllReviewsByUser(userID)
    res.json({'reviews': result})
})

app.get('/movies/reviews', async (req, res) => {
    const movieID = req.query.movieID
    const result = await getAllReviewsByMovie(movieID)
    res.json({'reviews': result})
})

app.get('/movies/reviews/:rating', async (req, res) => {
    const movieID = req.query.movieID;
    const rating = req.params.rating;
    const result = await getAllMovieReviewsByRating(movieID, rating)
    res.json({'reviews': result})
})

app.get('/user/reviews/:rating', async (req, res) => {
    const userID = req.query.userID;
    const rating = req.params.rating;
    const result = await getAllUserReviewsByRating(userID, rating)
    res.json({'reviews': result})
})

app.post('/user/reviews', async (req, res) => {
    const allData = req.body;
    const result = await addReviewForUser(allData)
    res.json({'givenID': result})
})

app.patch('/user/reviews', async (req, res) => {
    const allData = req.body;
    const result = await updateReviewForUser(allData)
    res.json({'posted': result})
})

app.patch('/user/rate/:rate', async (req, res) => {
    const userID = req.body.userID;
    const isPositive = req.params.rate === 'true';
    const result = await rateReview(userID, isPositive)
    res.json({'wasRated': result})
})

app.delete('/user/reviews', async (req, res) => {
    const reviewID = req.body.reviewID;
    const result = await deleteReview(reviewID)
    res.json({'posted': result})
})

app.listen('3333')
console.log('listening on 3333')

module.exports = app;