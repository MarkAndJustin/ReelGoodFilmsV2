import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsPlayFill } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';

import Movies from './Movies';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([])
  const [animatedMovies, setAnimatedMovies] = useState([])
  const [comedyMovies, setComedyMovies] = useState([])
  const [horrorMovies, setHorrorMovies] = useState([])

  useEffect(() => {
    let trendingMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=abca8adda9e521b362fff5ab08ec8402';
    let actionMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=abca8adda9e521b362fff5ab08ec8402&with_genres=28';
    let animatedMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=abca8adda9e521b362fff5ab08ec8402&with_genres=16';
    let comedyMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=abca8adda9e521b362fff5ab08ec8402&with_genres=35';
    let horrorMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=abca8adda9e521b362fff5ab08ec8402&with_genres=27';
    
    const reqOne = axios.get(trendingMovies);
    const reqTwo = axios.get(actionMovies);
    const reqThree = axios.get(animatedMovies);
    const reqFour = axios.get(comedyMovies);
    const reqFive = axios.get(horrorMovies);

    axios.all([reqOne, reqTwo, reqThree, reqFour, reqFive])
    .then(axios.spread((...res) => {
      const resOne = res[0];
      const resTwo = res[1];
      const resThree = res[2];
      const resFour = res[3];
      const resFive = res[4];

      setMovies(resOne.data.results)
      setActionMovies(resTwo.data.results)
      setAnimatedMovies(resThree.data.results)
      setComedyMovies(resFour.data.results)
      setHorrorMovies(resFive.data.results)
    }))
  }, []);



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
      <Movies title="Trending Movies" moviesList={movies} />
      <Movies title="Action Movies" moviesList={actionMovies} />
      <Movies title="Animated Movies" moviesList={animatedMovies} />
      <Movies title="Horror Movies" moviesList={horrorMovies} />
      <Movies title="Comedy Movies" moviesList={comedyMovies} />
    </>
  )
}

export default Home