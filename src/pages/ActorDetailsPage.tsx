import { useEffect, useState } from "react";
import type { useParams } from "react-router-dom"

export default function ActorDetails() {
    const { id } useParams();
    const [actor, setActor] = useState<any>(null);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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
        <div></div>
    )
}