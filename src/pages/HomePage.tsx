// import "./style/home.css";

// export default function HomePage(){
//     return(
//         <div className="home-page">
//             <div className="home">
//                 <h1 className="home-title">Review Everything</h1>
//                 <p className="home-tag">Discover movies and review them! </p>
//             </div>
//         </div>
//     )
// }
import { useEffect, useState } from "react";
import "./style/home.css";
import {
  getMoviesByGenre,
  getTrendingMovies,
  IMAGE_BASE,
  type Movie,
} from "../services/tmdb";

const genreList = [
  { id: 28, name: "Action" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 53, name: "Thriller" },
  { id: 14, name: "Fantasy" },
];

type GenreMovie = {
  genre: string;
  movie: Movie;
};

function getImage(path: string | null) {
  return path ? `${IMAGE_BASE}${path}` : "";
}

function ReviewCard({ movie }: { movie?: Movie }) {
  const rating = movie ? movie.vote_average.toFixed(1) : "5.0";

  return (
    <article className="review-card">
      <div className="stars">★★★★★</div>

      <h3>{movie?.title || "Review title"}</h3>

      <p>
        {movie?.review
          ? movie.review.slice(0, 120) + "..."
          : "A cinematic experience that actually deserves the hype."}
      </p>

      <div className="reviewer">
        <div className="avatar"></div>
        <div>
          <strong>Reviewer name</strong>
          <span>Rating: {rating}</span>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [genreMovies, setGenreMovies] = useState<GenreMovie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | undefined>();
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function loadLandingPage() {
      try {
        const genreData = await Promise.all(
          genreList.map(async (genre) => {
            const movies = await getMoviesByGenre(genre.id);
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];

            return {
              genre: genre.name,
              movie: randomMovie,
            };
          })
        );

        const trending = await getTrendingMovies();
        const randomMovie = trending[Math.floor(Math.random() * trending.length)];


        setGenreMovies(genreData.filter((item) => item.movie));
        setTrendingMovies(trending.slice(0, 5));
        setFeaturedMovie(randomMovie);
      } catch (error) {
        console.error("Landing page API error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLandingPage();
  }, []);

  return (
    <main className="landing-page">
      <section className="hero-area">
        <div
          className="hero-image"
          style={{
            backgroundImage: featuredMovie?.backdrop_path
              ? `linear-gradient(to right, rgba(7,10,18,0.96), rgba(7,10,18,0.42)), url(${getImage(
                  featuredMovie.backdrop_path
                )})`
              : undefined,
          }}
        >
          <div className="hero-overlay">
            <p className="eyebrow">Featured Review</p>
            <h1>{featuredMovie?.title || "Find your next favorite movie."}</h1>
            <p>
              {featuredMovie?.overview ||
                "Search movies, rate what you watched, and see what everyone else is saying."}
            </p>
          </div>
        </div>

        <aside className="hero-side">
          <ReviewCard movie={featuredMovie} />
          <button className="start-reviewing">Start Reviewing</button>
        </aside>
      </section>

      <section className="filter-area">
        <div className="filter-box">
          <div className="filter-search">
            <h2>Search By</h2>
            <span>⌕</span>
          </div>

          <select>
            <option>Language</option>
            <option>English</option>
            <option>Spanish</option>
            <option>Japanese</option>
            <option>Korean</option>
          </select>

          <select>
            <option>Rating</option>
            <option>9+ Stars</option>
            <option>8+ Stars</option>
            <option>7+ Stars</option>
          </select>

          <select>
            <option>Genre</option>
            {genreList.map((genre) => (
              <option key={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="content-area">
        <div className="section-heading">
          <p>Popular Picks</p>
          <h2>Trending Now</h2>
        </div>

        <div className="movie-row">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div className="movie-card skeleton" key={index}></div>
              ))
            : genreMovies.map((item) => (
                <article
                  className="movie-card"
                  key={item.genre}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1)), url(${getImage(
                      item.movie.backdrop_path || item.movie.poster_path
                    )})`,
                  }}
                >
                  <button className="heart">♡</button>

                  <div className="movie-info">
                    <span>{item.genre}</span>
                    <small>{item.movie.title}</small>
                  </div>
                </article>
              ))}

          <button className="view-more">View More →</button>
        </div>

        <div className="section-heading reviews-heading">
          <p>Fresh Opinions</p>
          <h2>Recent Reviews</h2>
        </div>

        <div className="recent-row">
          {trendingMovies.map((movie) => (
            <ReviewCard movie={movie} key={movie.id} />
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <p>Review Everything</p>
        <p>Group Name © 2026</p>
        <p>Links</p>
      </footer>
    </main>
  );
}