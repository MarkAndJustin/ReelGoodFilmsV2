import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BsPlayFill } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import VideoModal from '../UI/VideoModal';
import movieTrailer from 'movie-trailer';
import styles from './MovieDetails.module.css';

const MovieDetails = (props) => {
  const {movieID} = useParams();
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  //video modal controls
  const handleShowModal = () => {
    setIsModalOpened(true)
    movieTrailer(movie?.title || "")
    .then(url => {
      const urlParams = new URLSearchParams(new URL(url).search)
      setTrailerUrl(urlParams.get("v"))
    }).catch((error) => {
      console.log(error)
    }) 
  }

  const handleCloseModal = () => {
    setIsModalOpened(false)
  }

    useEffect(() => {
      let movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieID}?api_key=abca8adda9e521b362fff5ab08ec8402&append_to_response=videos`;
      let movieCastUrl = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=abca8adda9e521b362fff5ab08ec8402`

      const reqOne = axios.get(movieDetailsUrl);
      const reqTwo = axios.get(movieCastUrl);
      axios
      .all([reqOne, reqTwo])
      .then(axios.spread((...responses) => {
        const resOne = responses[0];
        const resTwo = responses[1];
        const slicedCast = resTwo.data.cast.slice(0, 5);
        setMovie(resOne.data)
        setCast(slicedCast)
    }))
  }, [movieID]);
    
  const { title, backdrop_path, overview, vote_average } = movie;  

  return (
      <>
        <div className={styles.movie} style={{
          backgroundSize: 'cover',
          backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.966) 35%,transparent), url("https://image.tmdb.org/t/p/w1280${backdrop_path}")`
        }}>
          <div className={styles.detailsWrapper}>
            {isModalOpened && <VideoModal onShowModal={handleCloseModal} videoSrc={trailerUrl} />}
              <div className={styles.movieDetails}>
                <h2 className={styles.movieTitle}>{title}</h2>  
                <h3 className={styles.movieRating}>Rating: {vote_average}</h3>
                <p className={styles.movieOverview}>{overview}</p>
              </div>
            <div>
              <button className={styles.movieTrailerButton} onClick={handleShowModal}>
                <BsPlayFill />
                Watch Trailer
              </button>
              <button className={styles.addToListButton} onClick={() => props.handleAddMovie(movie)}>
                <GoPlus />
                Add to List
              </button>
            </div>
            {cast.length > 0 ? <h3 className={styles.castHeading}>Starring:</h3> : <h3 className={styles.castHeading}>Cast Not Found</h3>}
            <div className={styles.castList}>
              {cast.map(actor => {
                return (
                  <div key={actor.id}>
                    <p>{actor.original_name}</p>
                    <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.original_name} />
                  </div>
                  )
                })
              }   
            </div>
          </div>
      </div>
    </>
  )

}

export default MovieDetails