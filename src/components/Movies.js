import { Link } from "react-router-dom"

const Movies = (props) => {
  return (
    <section className="movies">
      <div className="wrapper">
        <h3  className="genreHeader">{props.title}</h3>
        <div className="movieList">
          {props.moviesList.map(movie => {
            return (
              <div>
                  <Link to={`/movie/${movie.id}`}>
                    <div className="movieContainer">
                      <img  
                        key={movie.id}
                        className='movieImage' 
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                        alt={`A poster for ${movie.title}`} 
                      />
                      <div className="movieOverlay">
                        <h4 className="movieTitle">{movie.title}</h4>
                      </div>
                    </div>
                  </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Movies