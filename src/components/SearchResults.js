import { useLocation } from "react-router-dom"
import Movies from "./Movies";

const SearchResults = () => {
  const { state } = useLocation();
  console.log(state)


  return (
    <section className="searchPage">
      {state.map(movie => {
        return (
          <div>
            <div className="movieTitle">{movie.title}</div>
          </div>
        )
      })}
    </section>
  )
}

export default SearchResults