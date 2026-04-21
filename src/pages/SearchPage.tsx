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
        if(!query.trim()){
            alert("Please enter a search term");
            return;
        }
        setSearched(true);
        try{
            let url = "";
            if(selectedGenre){
                url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&sort_by=popularity.desc`;
            }else{
                const personRes = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&sort_by=popularity.desc`);
                const personData = await personRes.json();
                const actorId = personData.results?.[0]?.id;

                if(actorId){
                    url =  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_cast=${actorId}`;
                }else{
                    url =  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
                }
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
                        {movie.poster_path && (
                            <img 
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}