/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style/moviedetails.css";
import WriteReviewForm from "../components/reviews/WriteReviews";
import OtherReviews from "../components/reviews/OtherReviews";
import { useNavigate } from "react-router-dom";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState<any>(null);
    const [reviews, setReviews] = useState<any>([]);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const navigate = useNavigate();
    const [reviewRefreshKey, setReviewRefreshKey] = useState(0);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
                );

                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error("Failed to fetch movie details:", err);
            }
        }

        if (id) fetchMovie();
    }, [id, API_KEY]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3100/api/movies/reviews?movieID=${id}`
                );
                const data = await res.json();
                setReviews(data.reviews);
            } catch (err) {
                console.error('Failed, its joever', err);
            }
        };
        fetchReviews();
    }, [id]);

    if (!movie) {
        return <p className="loading">Loading movie details...</p>;
    }

    const backdropImage = movie.backdrop_path || movie.poster_path;
    const utisRelease = movie.release_dates?.results?.find(
        (result: any) => result.iso_3166_1 ==="US"
    );
    const mpaRate = utisRelease?.release_dates?.find(
        (release: any) => release.certification !== ""
    )?.certification || "NR";

    return (
        <main className="movie-details-page">
            <section
                className="movie-hero"
                style={{
                    backgroundImage: `linear-gradient(
                rgba(12, 12, 18, 0.78),
                rgba(12, 12, 18, 0.95)
            ), url(https://image.tmdb.org/t/p/original${backdropImage})`,
            }}
        >
            <div className="movie-hero-inner page-width">
            <button
                className="back-button"
                onClick={() => navigate(-1)}
                >
                ← Back
            </button>

                    <div className="details-main">
                        <img
                            className="movie-detail-poster"
                            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                            alt={movie.title}
                        />

                        <div className="details-content">
                            <p className="eyebrow">Movie Details</p>

                            <h1 className="movie-detail-title">{movie.title}</h1>

                            {movie.tagline && (
                                <p className="movie-tagline">“{movie.tagline}”</p>
                            )}

                <p className="movie-release">
                    <span className="rating-badge">{mpaRate}</span> •{" "}
                    {movie.release_date || "Unknown release date"} •{" "}
                    {movie.runtime ? `${movie.runtime} min` : "Runtime unavailable"} •{" "}
                    ⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10
                </p>

                            <div className="movie-genres">
                                {movie.genres?.map((genre: any) => (
                                    <span key={genre.id} className="genre-pill">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <h2>Overview</h2>
                            <p className="movie-overview">
                                {movie.overview || "No description available."}
                            </p>
                        </div>
                        {(reviews.length !== 0) && (
                            <div className="review-section">
                                <h2>Reviews</h2>
                                <div className="review-grid">
                                    {reviews.map((review: any) => (
                                        <div key={review.movieID} className="review-card">
                                            <p className="review-supertext">{review.title} - <strong>{review.rating}</strong></p>
                                            <p className="review-subtext">Reviewed by: {review.username}</p>
                                            <p>{review.content}</p>
                                            <p className="review-subtext">ThumbsUp: {review.thumbsUp}, ThumbsDown: {review.thumbsDown}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {!(reviews.length !== 0) && (
                            <div className="review-errorcard">
                                <p className="review-errortext"><strong>NO REVIEWS AVAILABLE FOR THIS MOVIE CURRENTLY</strong></p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="cast-section">
                <div className="section-header">
                    <p className="eyebrow">Featured Cast</p>
                    <h2>Cast</h2>
                </div>

                <div className="cast-grid">
                    {movie.credits?.cast?.slice(0, 12).map((actor: any) => (
                        <article key={actor.cast_id || actor.id} className="cast-card">
                            {actor.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                />
                            ) : (
                                <div className="cast-placeholder">No Image</div>
                            )}

                            <h3>{actor.name}</h3>
                            <p>{actor.character}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="review-compose-section">
                <div className="review-preview-card">
                    <img
                        src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <div>
                        <p className="eyebrow">Your Review</p>
                        <h2>{movie.title}</h2>
                        <p>Share what you thought about this movie.</p>
                    </div>
                </div>

                <WriteReviewForm
                    movieID={id!}
                    onReviewCreated={() => setReviewRefreshKey((prev) => prev + 1)}
                />
            </section>

            <OtherReviews movieID={id!} refreshKey={reviewRefreshKey} />

            <footer className="landing-footer">
                <p>Review Everything</p>
                <p>Group Name © 2026</p>
                <p>Links</p>
            </footer>
        </main>
    );
}