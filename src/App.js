import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './components/Home';
import Movies from './components/Movies';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios({
      url:  'https://api.themoviedb.org/3/discover/movie',
      params: {
        api_key: 'abca8adda9e521b362fff5ab08ec8402',
      },
    }).then((res) => {
      const movieData = res.data.results;
      setMovies(movieData);
      console.log(movies)
    })
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home moviesList={movies}/>} /> 
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </>
  );
}

export default App;
