/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./OtherReviews.css";

type Review = {
    _id: string;
    userID: number;
    movieID: string;
    username?: string;
    title?: string;
    content?: string;
    rating: number;
    thumbsUp?: number;
    thumbsDown?: number;
};

type OtherReviewsProps = {
    movieID: string;
    refreshKey?: number;
};

const API_BASE = "http://localhost:3100/api";

export default function OtherReviews({ movieID, refreshKey = 0 }: OtherReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);

    async function fetchReviews() {
        try {
        const res = await fetch(`${API_BASE}/movies/reviews?movieID=${movieID}`);
        const data = await res.json();
        setReviews(data.reviews || []);
        } catch {
        setReviews([]);
        }
    }

    async function rateReview(reviewID: string, isPositive: boolean) {
        await fetch(`${API_BASE}/user/rate/${isPositive}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewID }),
        });

        fetchReviews();
    }

    useEffect(() => {
        if (movieID) fetchReviews();
    }, [movieID, refreshKey]);

    return (
        <section className="other-reviews-section">
        <h2>Other Reviews</h2>

        <div className="other-reviews-grid">
            {reviews.length === 0 ? (
            <p className="empty-reviews">No reviews yet. Be the first one to review this movie.</p>
            ) : (
            reviews.map((review) => (
                <article className="review-card" key={review._id}>
                <div className="review-stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                </div>

                <h3>{review.title || "Review title"}</h3>
                <p>{review.content || "Review body"}</p>

                <div className="review-user">
                    <div className="review-avatar" />
                    <div>
                    <strong>{review.username || "Reviewer name"}</strong>
                    <span>Date</span>
                    </div>
                </div>

                <div className="review-actions">
                    <button type="button" onClick={() => rateReview(review._id, true)}>
                    👍 {review.thumbsUp || 0}
                    </button>

                    <button type="button" onClick={() => rateReview(review._id, false)}>
                    💬 Comment
                    </button>
                </div>
                </article>
            ))
            )}
        </div>
        </section>
    );
}