import { Link } from "react-router-dom"
import styles from './Movies.module.css';

const Movies = (props) => {
  return (
    <section className={styles.movies}>
      <div className="wrapper">
        <h3  className={styles.genreHeader}>{props.title}</h3>
        <div className={styles.movieList}>
          {props.moviesList.map(movie => {
            return (
              <div key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <div className={styles.movieContainer}>
                      <img  
                        key={movie.id}
                        className={styles.movieImage} 
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                        alt={`A poster for ${movie.title}`} 
                      />
                      <div className={styles.movieOverlay}>
                        <h4 className={styles.movieTitle}>{movie.title}</h4>
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