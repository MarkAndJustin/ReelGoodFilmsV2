import React from 'react';
import styles from './MyList.module.css';
import { Link } from "react-router-dom"
import { BsTrash } from "react-icons/bs";


const MyList = (props) => {
  const {favMovies} = props

  return (
    <section className={styles.myList}>
        <div className={`wrapper ${styles.myListWrapper}`}>
          {favMovies.length === 0 ? 
            <h2 className={styles.myListHeading}>No Movies in List</h2> : <h2 className={styles.myListHeading}>My List:</h2>}
            <div className={styles.cardContainer}>
              {favMovies.map((movie, index) => {
                return (
                  <div className={styles.card} key={index}>
                    <div className={styles.cardDetails}>
                      <h3 className={styles.movieTitle}>{movie.data.original_title}</h3>
                      <BsTrash
                        className={styles.trashIcon} 
                        onClick={() => props.handleDeleteMovie(movie.name)}/>
                    </div>
                    <Link to={`/movie/${movie.data.id}`}>
                      <img 
                        className={styles.cardPoster}
                        src={`https://image.tmdb.org/t/p/w300${movie.data.poster_path}`}
                        alt={`A poster for ${movie.data.title}`} 
                      />
                    </Link>
                  </div>
                )
              })}
            </div>
        </div>
    </section>
  )
}

export default MyList