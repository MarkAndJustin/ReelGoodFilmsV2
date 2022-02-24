import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsPlayFill } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';

const MovieDetails = () => {
    const { movieID } = useParams();
    const [ movie, setMovie ] = useState([]);
    const [ cast, setCast ] = useState([]);

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
        console.log(resTwo.data.cast)
        console.log(resOne.data)
        const slicedCast = resTwo.data.cast.slice(0, 5);
        console.log(slicedCast)
        setMovie(resOne.data)
        setCast(slicedCast)
    }))
  }, [movieID]);
    
    const { title, backdrop_path, overview, vote_average } = movie
   


    return (
        <>
          <div className="movie" style={{
            backgroundSize: 'cover',
            backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.966) 35%,transparent), url("https://image.tmdb.org/t/p/w1280${backdrop_path}")`
          }}>
            <div className="detailsWrapper">
                <div className="movieDetails">
              <h2 className='movieTitle'>{title}</h2>  
              <h3 className='movieRating'>Rating: {vote_average}</h3>
              <p className="movieOverview">{overview}</p>
            </div>
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
            <h3 className='castListHeading'>Starring:</h3>
            <div className='castList'>
              {cast.map(actor => {  
                return (
                    <div className="actorContainer">
                      <p>{actor.original_name}</p>
                      <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt="" />
                    </div>
                  )
                })
              }   
            </div>
            </div>
            {/* <iframe 
              src={`https://www.youtube.com/embed/${videos.results[0].key}`} 
              frameBorder="0"
              allowFullScreen
              title={videos.results[0].name}
            >
            </iframe> */}
        </div>
      </>
    )

}

export default MovieDetails