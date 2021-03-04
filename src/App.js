import React, { useState } from 'react';
import liveSearch from '../src/utils/live_search';
import './App.css';
import logo from './logo.svg';

export default function App() {
  const [movieQuery, setMovieQuery] = useState('');
  const [movies, setMovies] = useState([]);


  const fetchMovies = async (query) => {
    setMovieQuery(query);

    if (query || query !== '') {
      const result = await liveSearch(`
      https://api.themoviedb.org/3/search/movie?query=${query}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`);

      if (result) {
      setMovies(result.results.map(x => x.title));
      }
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <input
          value={movieQuery}
          onChange={(e) => fetchMovies(e.target.value)}
        />
        <ul>
          { movies.map((val, idx) => {
            return <li key={idx}>{val}</li>
          })}
        </ul>
      </header>
    </div>
  );
}
