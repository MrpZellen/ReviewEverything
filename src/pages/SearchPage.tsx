import { useState } from "react";

export default function SearchPage(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const handleSearch = async () => {
        if(!query.trim()) return;
        console.log("Searching for:", query);
        setSearched(true);
        try{
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
            );
            const data = await res.json();
            setResults(data.results || []);
            setSearched(true);
        }catch (err){
            console.error(err);
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