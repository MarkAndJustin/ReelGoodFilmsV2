import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = () => {
    const { movieID } = useParams();
    const [ movie, setMovie ] = useState([]);
    const [ cast, setCast ] = useState([]);

    useEffect(() => {
      let movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieID}?api_key=abca8adda9e521b362fff5ab08ec8402`;
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
  }, []);
    
    const { title, backdrop_path, overview, vote_average } = movie
    console.log(title)

    return (
        <>
        <div className="movie" style={{
          backgroundSize: 'cover',
          backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.966) 35%,transparent), url("https://image.tmdb.org/t/p/w1280${backdrop_path}")`
        }}>
            <div className="movieDetails">
            <h3>{title}</h3>  
            <p className='movieRating'>Rating: {vote_average}</p>
            <p className="movieOverview">{overview}</p> 
            <h3>Starring:</h3>
            <div className='castList'>
            {
              cast.map(actor => {
               
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
        </div>
        </>
    )

}

export default MovieDetails