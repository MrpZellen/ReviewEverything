/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./style/search.css";
import { Link } from "react-router-dom";

const allGenreRows = [
    { id: 14, name: "Fantasy" },
    { id: 35, name: "Comedy" },
    { id: 28, name: "Action" },
    { id: 10749, name: "Romance" },
    { id: 27, name: "Horror" },
    { id: 53, name: "Thriller" },
    { id: 878, name: "Sci-Fi" },
    { id: 16, name: "Animation" },
    { id: 12, name: "Adventure" },
    { id: 9648, name: "Mystery" },
];

function getRandomGenres() {
    return [...allGenreRows].sort(() => Math.random() - 0.5).slice(0, 5);
}

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);
    const [genreRows] = useState(getRandomGenres);
    const [genres, setGenres] = useState<any[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [moviesByGenre, setMoviesByGenre] = useState<Record<string, any[]>>({});

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
    }, [API_KEY]);

    useEffect(() => {
        const fetchGenreRows = async () => {
            try {
                const genreData = await Promise.all(
                    genreRows.map(async (genre) => {
                        const randomPage = Math.floor(Math.random() * 20) + 1;

                        const res = await fetch(
                            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc&page=${randomPage}`
                        );

                        const data = await res.json();

                        const randomMovies = [...(data.results || [])]
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 10);

                        return {
                            genreName: genre.name,
                            movies: randomMovies,
                        };
                    })
                );

                const formatted: Record<string, any[]> = {};

                genreData.forEach((row) => {
                    formatted[row.genreName] = row.movies;
                });

                setMoviesByGenre(formatted);
            } catch (err) {
                console.error("Genre rows failed:", err);
            }
        };

        fetchGenreRows();
    }, [API_KEY, genreRows]);

    const handleSearch = async () => {
        if (!query.trim() && !selectedGenre) {
            alert("Please enter a search term or choose a genre");
            return;
        }

        setSearched(true);

        try {
            let finalResults: any[] = [];

            if (query.trim() !== "") {
                const [movieRes, personRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`),
                    fetch(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${query}`)
                ]);

                const movieData = await movieRes.json();
                const personData = await personRes.json();

                const actor = personData.results?.find(
                    (p: any) => p.known_for_department === "Acting"
                );

                if (actor && query.includes(" ")) {
                    const actorMovieRes = await fetch(
                        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_cast=${actor.id}&sort_by=popularity.desc&page=1`
                    );
                    const actorMovieData = await actorMovieRes.json();
                    finalResults = actorMovieData.results || [];
                } else if (movieData.results && movieData.results.length > 0) {
                    const filtered = movieData.results.filter((movie: any) =>
                        movie.title.toLowerCase().includes(query.toLowerCase())
                    );
                    finalResults = filtered.length > 0 ? filtered : movieData.results;
                }

                if (selectedGenre) {
                    finalResults = finalResults.filter((movie: any) =>
                        movie.genre_ids?.includes(Number(selectedGenre))
                    );
                }

            } else if (selectedGenre) {
                const res = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&sort_by=popularity.desc`
                );
                const data = await res.json();
                finalResults = data.results || [];
            }

            setResults(finalResults);

        } catch (err) {
            console.error(err);
            setResults([]);
        };
    }

    return (
        <div className="search-page">
            <h1 className="search-title">Movie Search</h1>

            <div className="search-controls">
                <input
                    className="neon-input"
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <select
                    className="neon-select"
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

                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {searched ? (
                <div className="results-section">
                    {results.length === 0 && <p className="no-results">No results found</p>}

                    <div className="results-grid">
                        {results.map((movie) => (
                            <Link to={`/movie/${movie.id}`} className="movie-card" key={movie.id}>
                                {movie.poster_path && (
                                    <img
                                        className="movie-poster"
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                )}
                                <p className="movie-title">{movie.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <section className="genre-rows-section">
                    {genreRows.map((genre) => (
                        <div className="genre-row-block" key={genre.id}>
                            <h2>{genre.name} Movies</h2>

                            <div className="genre-scroll-wrapper">
                                <div className="genre-movie-row" id={`genre-row-${genre.id}`}>
                                    {(moviesByGenre[genre.name] || []).map((movie) => (
                                        <Link to={`/movie/${movie.id}`} className="genre-movie-card" key={movie.id}>
                                            {movie.poster_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                                    alt={movie.title}
                                                />
                                            ) : (
                                                <div className="poster-placeholder">No Image</div>
                                            )}

                                            <p>{movie.title}</p>
                                        </Link>
                                    ))}
                                </div>

                                <button
                                    className="genre-scroll-button"
                                    type="button"
                                    onClick={() => {
                                        const row = document.getElementById(`genre-row-${genre.id}`);
                                        row?.scrollBy({ left: 650, behavior: "smooth" });
                                    }}
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            )}
            <footer className="landing-footer">
                <p>Review Everything</p>
                <p>Group Name © 2026</p>
                <p>Links</p>
            </footer>
        </div>
    );
}