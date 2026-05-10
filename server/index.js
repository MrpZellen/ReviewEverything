import { addReviewForUser, updateReviewForUser, deleteReview, getAllReviewsByMovie, getAllReviewsByUser, getAllMovieReviewsByRating,
    getAllUserReviewsByRating, rateReview } from './data/review-DAL.js';
import express from 'express';
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ 'isServingJSON': true })
})

app.get('/api/user/reviews', async (req, res) => {
    const userID = await req.query.userID
    const result = await getAllReviewsByUser(userID)
    res.json({'reviews': result})
})

app.get('/api/movies/reviews', async (req, res) => {
    const movieID = await req.query.movieID
    console.log('review: ', movieID)
    const result = await getAllReviewsByMovie(movieID)
    res.json({'reviews': result})
})

app.get('/api/movies/reviews/:rating', async (req, res) => {
    const movieID = await req.query.movieID;
    const rating = await req.params.rating;
    const result = await getAllMovieReviewsByRating(movieID, rating)
    res.json({'reviews': result})
})

app.get('/api/user/reviews/:rating', async (req, res) => {
    const userID = await req.query.userID;
    const rating = await req.params.rating;
    const result = await getAllUserReviewsByRating(userID, rating)
    res.json({'reviews': result})
})

app.post('/api/user/reviews', async (req, res) => {
    const allData = await req.body;
    const result = await addReviewForUser(allData)
    res.json({'givenID': result})
})

app.patch('/api/user/reviews', async (req, res) => {
    const allData = await req.body;
    const result = await updateReviewForUser(allData)
    res.json({'posted': result})
})

app.patch('/api/user/rate/:rate', async (req, res) => {
    const userID = await req.body.userID;
    const isPositive = await req.params.rate === 'true';
    const result = await rateReview(userID, isPositive)
    res.json({'wasRated': result})
})

app.delete('/api/user/reviews', async (req, res) => {
    const reviewID = await req.body.reviewID;
    const result = await deleteReview(reviewID)
    res.json({'posted': result})
})

// Only start server if this file is run directly (not imported for tests)
if (import.meta.url === `file://${process.argv[1]}`) {
    app.listen(3100, '0.0.0.0');
    console.log('listening on 3100');
}

export default app;