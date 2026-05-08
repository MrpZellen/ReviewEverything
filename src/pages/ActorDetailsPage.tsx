import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import "./style/actordetails.css";

export default function ActorDetails() {
    const { id } = useParams();
    const [actor, setActor] = useState<any>(null);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const location = useLocation();
    const backLink = location.state?.from || "/search";

    useEffect(() => {
        const fetchActor = async () => {
            const res = await fetch(
                `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&append_to_response=movie_credits`
            );
            const data = await res.json();
            setActor(data);
        };
        fetchActor();
    }, [id]);
    if (!actor) return <p className="loading">Loading...</p>;
    
    return (
        <div className="actor-page">
            <div className="actor-backdrop" style={{backgroundImage: actor.profile_path ? `url(https://image.tmdb.org/t/p/original${actor.profile_path})` : "none"}}/>
            <div className="actor-content page-container">
                <Link to={backLink} className="neon-button">←</Link>
                <div className="actor-main">
                    {actor.profile_path && (
                        <img className="actor-image neon-image" src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} alt={actor.name}/>
                    )}
                    <div className="actor-info">
                        <h1 className="actor-name">{actor.name}</h1>
                        {actor.birthday && (
                            <p className="actor-meta">Born: {actor.birthday}</p>
                        )}
                        {actor.place_of_birth && (
                            <p className="actor-meta">From: {actor.place_of_birth}</p>
                        )}
                        <p className="actor-bio">{actor.biography}</p>
                    </div>
                </div>
                <div className="known-for-section">
                    <h2 className="known-for">Known For</h2>
                    <div className="movie-grid">
                        {actor.movie_credits?.cast?.map((movie: any) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card neon-card">
                                {movie.poster_path && (
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                                )}
                                <p>{movie.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}