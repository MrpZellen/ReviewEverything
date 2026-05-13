const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "26ed2335ed25470dd88ab28ad327cf06";
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  review?: string; // Optional review field for user-generated reviews
};

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();
  return data.results || [];
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await res.json();
  return data.results || [];
}