import { useLocation, Link } from "react-router-dom";
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const { state } = useLocation();
  console.log(state)


  return (
    <section className={styles.searchPage}>
      <div className={`wrapper ${styles.searchPageWrapper}`}>
        <h2 className={styles.searchHeading}>Search Results:</h2>
        <div className={styles.searchMoviesContainer}>
          {state.map(movie => {
          return (
            <div className={styles.movieCard}>
              <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div key={movie.id} className={styles.searchMovieOverlay}>
                <img 
                  className={styles.searchResultsPoster}
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={`A poster for ${movie.title}`} 
                />
                <div className={styles.searchMovieDescription}>
                    <div className={styles.movieTitle}>{movie.title}</div>
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

export default SearchResults