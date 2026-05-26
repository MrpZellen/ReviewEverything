import { useEffect, useState } from "react";
import "./style/reviews.css";

type Review = {
  _id: string;
  movieID: string;
  movieName?: string;
  username?: string;
  title?: string;
  content?: string;
  rating?: number;
  thumbsUp?: number;
  thumbsDown?: number;
};

const API_BASE = "http://localhost:3100/api";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

useEffect(() => {
  async function fetchReviews() {
    try {
      const res = await fetch(`${API_BASE}/reviews`);
      const data = await res.json();

      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

      const reviewsWithMovieNames = await Promise.all(
        (data.reviews || []).map(async (review: Review) => {
          try {
            const movieRes = await fetch(
              `https://api.themoviedb.org/3/movie/${review.movieID}?api_key=${API_KEY}`
            );

            const movieData = await movieRes.json();

            return {
              ...review,
              movieName: movieData.title || "Unknown Movie",
            };
          } catch {
            return {
              ...review,
              movieName: "Unknown Movie",
            };
          }
        })
      );

      setReviews(reviewsWithMovieNames);
    } catch (error) {
      console.error("Failed to load reviews:", error);
    }
  }

  fetchReviews();
}, []);

  return (
    <main className="reviews-page">
      <h1>All Reviews</h1>

      <div className="reviews-page-grid">
        {reviews.map((review) => {
          const rating = Math.min(5, Math.max(0, Math.round(Number(review.rating) || 0)));

          return (
            <article className="reviews-page-card" key={review._id}>
              <div className="reviews-page-stars">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </div>

              <h2>{review.title || "Untitled Review"}</h2>
              <p>{review.content || "No review text."}</p>

              <footer>
                <span>By: {review.username || "Reviewer Name"}</span>
                <span>Movie: {review.movieName}</span>
              </footer>
            </article>
          );
        })}
      </div>
    </main>
  );
}