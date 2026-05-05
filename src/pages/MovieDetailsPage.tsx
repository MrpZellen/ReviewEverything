import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import "./style/moviedetails.css";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState<any>(null);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
            );
            const data = await res.json();
            setMovie(data);
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="movie-details">
            <div className="backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})` }} />
            <div className="content">
                <Link to="/search" className="back-button">←</Link>
                <div className="details-main">
                    <img className="movie-detail-poster" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                    <div className="details">
                        <h1 className="movie-detail-title">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="movie-tagline">{movie.tagline}</p>
                        )}
                        <p className="movie-release">{movie.release_date} • {movie.runtime} min</p>
                        <div className="movie-genres">
                            {movie.genres?.map((g: any) => (
                                <span key={g.id} className="genre-pill">
                                    {g.name}
                                </span>
                            ))}
                        </div>
                        <p className="movie-overview">{movie.overview}</p>
                    </div>
                </div>
                <div className="cast-section">
                    <h2>Cast</h2>
                    <div className="cast-grid">
                        {movie.credits?.cast?.map((actor: any) => (
                            <div key={actor.id} className="cast-card">
                                {actor.profile_path && (
                                    <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name}/>
                                )}
                                <p>{actor.name}</p>
                                <span className="charcter">{actor.character}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}