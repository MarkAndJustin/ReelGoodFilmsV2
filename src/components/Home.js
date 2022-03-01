import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsPlayFill } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';


import Movies from './Movies';
import VideoModal from './VideoModal';
import movieTrailer from 'movie-trailer';


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const randomNumberHandler = (maxNumber) => {
    const generateRandomNum = Math.floor(Math.random() * maxNumber);
    return generateRandomNum
  }

  const randomNumber = randomNumberHandler(movies.length);

  const handleShowModal = () => {
    setIsModalOpened(true)
    movieTrailer(movies[randomNumber]?.title || "")
    .then(url => {
      const urlParams = new URLSearchParams(new URL(url).search)
      setTrailerUrl(urlParams.get("v"))
      console.log(trailerUrl)
    }).catch((error) => {
      console.log(error)
    }) 
  }

  const handleCloseModal = () => {
    setIsModalOpened(false)
  }

  useEffect(() => {
    let trendingMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=abca8adda9e521b362fff5ab08ec8402&include_video=true';
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
        backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.966) 35%,transparent), url("https://image.tmdb.org/t/p/w1280${movies[randomNumber].backdrop_path}")`,    
      }}>
        <div className="homeWrapper">
          {isModalOpened && <VideoModal onShowModal={handleCloseModal} videoSrc={trailerUrl} />}
          <div className="movieDescription">
            <h1>{movies[randomNumber].title}</h1>
            <p className='movieOverview'>{movies[randomNumber].overview}</p>
            <div className="movieButtonsContainer">
              <button className='movieTrailerButton' onClick={handleShowModal}>
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

export default Home;