import { useLocation, Link } from "react-router-dom"

const SearchResults = () => {
  const { state } = useLocation();
  console.log(state)


  return (
    <section className="searchPage">
      <div className="wrapper searchPageWrapper">
        {state.map(movie => {
          return (
            <Link to={`/movie/${movie.id}`}>
              <div key={movie.id}>
                <div className="movieTitle">{movie.title}</div>
                <img 
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  alt={`A poster for ${movie.title}`} 
                />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default SearchResults