import { addReviewForUser, updateReviewForUser, deleteReview, getAllReviewsByMovie, getAllReviewsByUser, getAllMovieReviewsByRating,
    getAllUserReviewsByRating, rateReview } from './data/review-DAL.js';
import { getAllUsers, getTopFiftyUsers, deleteUser, addUser, updateToAdmin, updateUser, getUser } from './data/user-DAL.js'
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.json({ 'isServingJSON': true })
})

app.get('/api/reviews', async (req, res) => {
    const result = await getAllReviews()
    res.json({ 'reviews': result })
})

app.get('/api/user/reviews', async (req, res) => {
    const userID = req.query.userID
    const result = await getAllReviewsByUser(userID)
    res.json({ 'reviews': result })
})

app.get('/api/movies/reviews', async (req, res) => {
    const movieID = req.query.movieID
    const result = await getAllReviewsByMovie(movieID)
    res.json({ 'reviews': result })
})

app.get('/api/movies/reviews/:rating', async (req, res) => {
    const movieID = req.query.movieID;
    const rating = req.params.rating;
    const result = await getAllMovieReviewsByRating(movieID, rating)
    res.json({ 'reviews': result })
})

app.get('/api/user/reviews/:rating', async (req, res) => {
    const userID = req.query.userID;
    const rating = req.params.rating;
    const result = await getAllUserReviewsByRating(userID, rating)
    res.json({ 'reviews': result })
})

app.post('/api/user/reviews', async (req, res) => {
    const allData = req.body;
    const result = await addReviewForUser(allData)
    res.json({ 'givenID': result })
})

app.patch('/api/user/reviews', async (req, res) => {
    const allData = req.body;
    const result = await updateReviewForUser(allData)
    res.json({ 'posted': result })
})

app.patch('/api/user/rate/:rate', async (req, res) => {
    const userID = req.body.userID;
    const isPositive = req.params.rate === 'true';
    const result = await rateReview(userID, isPositive)
    res.json({ 'wasRated': result })
})

app.delete('/api/user/reviews', async (req, res) => {
    const reviewID = req.body.reviewID;
    const result = await deleteReview(reviewID)
    res.json({ 'posted': result })
})

app.get('/api/users', async (req, res) => {
    const result = await getAllUsers()
    res.json({ 'users': result })
})

app.get('/api/users/top', async (req, res) => {
    const result = await getTopFiftyUsers()
    res.json({ 'users': result })
})

app.get('/api/reviews/top', async (req, res) => {
    const result = await getTopFiftyReviews()
    res.json({ 'reviews': result })
})

app.get('/api/user', async (req, res) => {
    const userID = req.query.userID;
    const result = await getUser(userID)
    res.json({ 'user': result })
})

app.post('/api/user', async (req, res) => {
    const user = req.body;
    const result = await addUser(user)
    res.json({ 'user': result })
})

app.patch('/api/user', async (req, res) => {
    const { userID, ...updatedFields } = req.body;
    const result = await updateUser(userID, updatedFields)
    res.json({ 'user': result })
})

app.patch('/api/user/admin', async (req, res) => {
    const userID = req.body.userID;
    const result = await updateToAdmin(userID)
    res.json({ 'user': result })
})

app.delete('/api/user', async (req, res) => {
    const userID = req.body.userID;
    const result = await deleteUser(userID)
    res.json({ 'posted': result })
})

if (import.meta.url === `file://${process.argv[1]}`) {
    app.listen(3100, '0.0.0.0');
    console.log('listening on 3100');
}



export default app;
