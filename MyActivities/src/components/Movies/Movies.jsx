import './Movies.css';
import { useEffect, useState } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=564a44e86c93022be7795807248d6c86&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setMovies(data.results.slice(0, 30)));
  }, []);

  return (
    <div className="movies-container">
      {movies.map(movie => (
        <div className="movie-card" key={movie.id}>
          <a href={`https://www.themoviedb.org/movie/${movie.id}` } target='_blank'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-title">{movie.title}</div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Movies;
