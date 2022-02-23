import { Link } from "react-router-dom"

const Movies = (props) => {
  console.log(props.moviesList)
  return (
    <section className="movies">
      <div className="wrapper">
        <h3  className="genreHeader">Trending Movies</h3>
        <div className="movieList">
          {props.moviesList.map(movie => {
            return (
              <div>
                  <Link to={`/movie/${movie.id}`}>
                      <img  className='movieImage' src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" />
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