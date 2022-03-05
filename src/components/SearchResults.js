import { useLocation } from "react-router-dom"

const SearchResults = () => {
  const { state } = useLocation();
  console.log(state)


  return (
    <section className="searchPage">
      <div className="wrapper searchPageWrapper">
        {state.map(movie => {
          return (
            <div key={movie.id}>
              <div className="movieTitle">{movie.title}</div>
              <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={`A poster for ${movie.title}`} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SearchResults