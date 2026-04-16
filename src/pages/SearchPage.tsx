import { useEffect, useState } from "react";

export default function SearchPage(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);

    const [genres, setGenres] = useState<any[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("");


    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchGenres = async () => {
            try{
                const res = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
                );
                const data = await res.json();
                setGenres(data.genres || []);
            }catch(err){
                console.error(err);
            }
        };
        fetchGenres();
    }, []);

    const handleSearch = async () => {
        setSearched(true);
        try{
            let url = "";
            if(selectedGenre){
                url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`;
            }
            else if(query.trim()){
                url =   `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
            }
            if(!url) return;
            const res = await fetch(url);
            const data = await res.json();
            setResults(data.results || []);
        }catch(err){
            console.log(err);
            setResults([]);
        }
    };
    return (
        <div>
            <h1>Movie Search</h1>
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <select
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
            <button onClick={handleSearch}>Search</button>

            <div>
                {searched && results.length === 0 && (
                    <p>No results found</p>
                )}
                {results.map((movie) => (
                    <div key={movie.id}>
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}