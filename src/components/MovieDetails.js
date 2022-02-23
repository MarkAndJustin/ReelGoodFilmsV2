import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = () => {
    const { movieID } = useParams();
    const [ movie, setMovie ] = useState([]);

    useEffect(() => {
    axios({
      url: `https://api.themoviedb.org/3/movie/${movieID}`,
      params: {
        api_key: 'abca8adda9e521b362fff5ab08ec8402'
      },
    }).then( (res) => {
      setMovie(res.data);
      console.log(res.data)
    })
  }, []);
    
    const { title, backdrop_path, overview } = movie
    console.log(title)

    return (
        <>
        <div className="movie" style={{
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backdrop_path}")`
        }}>
            <div className="movieDetails">
            <h3>{title}</h3>  
            <p className="movieOverview">{overview}</p>          
          </div>
            {/* <img className='movieBackdrop' src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`} alt="" /> */}
        </div>
        </>
    )

}

export default MovieDetails