import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsPlayFill } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';

import Movies from './Movies';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios({
      url:  'https://api.themoviedb.org/3/discover/movie',
      dataResponse: 'json',
      method: 'GET',
      params: {
        api_key: 'abca8adda9e521b362fff5ab08ec8402',
      },
    }).then((res) => {
      const movieData = res.data.results;
      setMovies(movieData);
    })
  }, []);

  console.log(movies[0])

  return (
    <>
      {movies.length > 0 && <header style={{
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.966) 35%,transparent), url("https://image.tmdb.org/t/p/w1280${movies[0].backdrop_path}")`,    
      }}>
        <div className="homeWrapper">
          <div className="movieDescription">
            <h1>{movies[0].title}</h1>
            <p className='movieOverview'>{movies[0].overview}</p>
            <div className="movieButtonsContainer">
              <button className='movieTrailerButton'>
                <BsPlayFill />
                Watch Trailer
              </button>
              <button className='addToListButton'>
                <GoPlus />
                Add to List
              </button>
            </div>
          </div>
        </div>
      </header>}
      <Movies moviesList={movies} />
    </>
  )
}

export default Home