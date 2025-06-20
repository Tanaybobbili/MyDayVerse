import './Movies.css';
import { useEffect, useState } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=564a44e86c93022be7795807248d6c86&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setMovies(data.results.slice(0, 50)));
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movies-container">
      <h1>🎬 Popular Movies</h1>

      <input
        type="text"
        className="movie-search"
        placeholder="Search Movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="movies-grid">
        {filteredMovies.length === 0 ? (
          <p>No movies match your search.</p>
        ) : (
          filteredMovies.map(movie => (
            <div className="movie-card" key={movie.id}>
              <a href={`https://www.themoviedb.org/movie/${movie.id}`} target='_blank' rel="noreferrer">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-title">{movie.title}</div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Movies;
