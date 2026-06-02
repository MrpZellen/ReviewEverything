/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style/moviedetails.css";
import WriteReviewForm from "../components/reviews/WriteReviews";
import OtherReviews from "../components/reviews/OtherReviews";

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<any>(null);
    const [reviewRefreshKey, setReviewRefreshKey] = useState(0);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,release_dates`
                );

                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error("Failed to fetch movie details:", err);
            }
        }

        if (id) fetchMovie();
    }, [id, API_KEY]);

    if (!movie) {
        return <p className="loading">Loading movie details...</p>;
    }

    const backdropImage = movie.backdrop_path || movie.poster_path;

    const usRelease = movie.release_dates?.results?.find(
        (result: any) => result.iso_3166_1 === "US"
    );

    const mpaRate =
        usRelease?.release_dates?.find(
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
                    <button className="back-button" onClick={() => navigate(-1)}>
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
                    </div>
                </div>
            </section>

            <section className="cast-section page-width">
                <div className="section-header">
                    <p className="eyebrow">Featured Cast</p>
                    <h2>Cast</h2>
                </div>

                <div className="cast-grid">
                    {movie.credits?.cast?.map((actor: any) => (
                        <Link
                            to={`/actor/${actor.id}`}
                            state={{ from: `/movie/${id}` }}
                            key={actor.cast_id || actor.id}
                            className="cast-card"
                        >
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
                        </Link>
                    ))}
                </div>
            </section>

            <section className="review-compose-section page-width">
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