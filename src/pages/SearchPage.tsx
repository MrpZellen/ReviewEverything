import { useEffect, useState } from "react";
import "./style/search.css";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);

    const [genres, setGenres] = useState<any[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("");


    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
                );
                const data = await res.json();
                setGenres(data.genres || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchGenres();
    }, []);

    const handleSearch = async () => {
        if (!query.trim()) {
            alert("Please enter a search term");
            return;
        }

        setSearched(true);

        try {
            let finalResults: any[] = [];

            if (selectedGenre) {
                const res = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&sort_by=popularity.desc`
                );
                const data = await res.json();
                finalResults = data.results || [];
            } else {
                const movieRes = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
                );
                const movieData = await movieRes.json();

                const personRes = await fetch(
                    `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${query}`
                );
                const personData = await personRes.json();

                const actor = personData.results?.find(
                    (p: any) => p.known_for_department === "Acting"
                );

                if (actor && query.includes(" ")) {
                    const actorId = actor.id;

                    const actorMovieRes = await fetch(
                        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_cast=${actorId}&sort_by=popularity.desc&page=1`
                    );
                    const actorMovieData = await actorMovieRes.json();

                    finalResults = actorMovieData.results || [];
                } else if (movieData.results && movieData.results.length > 0) {
                    const filtered = movieData.results.filter((movie: any) =>
                        movie.title.toLowerCase().includes(query.toLowerCase())
                    );

                    finalResults = filtered.length > 0 ? filtered : movieData.results;
                }
            }
            setResults(finalResults);
        } catch (err) {
            console.error(err);
            setResults([]);
        }
    };

    return (
        <div className="search-page">
            <h1 className="search-title">Movie Search</h1>
            <div className="search-controls">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <select
                    className="search-select"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>

            <div className="results-section">
                {searched && results.length === 0 && (
                    <p className="no-results">No results found</p>
                )}
                <div className="results-grid">
                    {results.map((movie) => (
                        <div className="movie-card" key={movie.id}>
                            {movie.poster_path && (
                                <img
                                    className="movie-poster"
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            )}
                            <p className="movie-title">{movie.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}