import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"

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
        <div>
            <div>
                <Link to={backLink} className="back-button">←</Link>
                <div>
                    {actor.profile_path && (
                        <img className="actor-image" src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} alt={actor.name}/>
                    )}
                    <div>
                        <h1>{actor.name}</h1>
                        {actor.birthday && (
                            <p>Born: {actor.birthday}</p>
                        )}
                        {actor.place_of_birth && (
                            <p>From: {actor.place_of_birth}</p>
                        )}
                        <p>{actor.bio}</p>
                    </div>
                </div>
                <div>
                    <h2>Known For</h2>
                    <div>
                        {actor.movie_credits?.cast?.map((movie: any) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id}>
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