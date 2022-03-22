import React from 'react';
import styles from './MyList.module.css';

const MyList = (props) => {

  console.log(props.favMovies)

  return (
    <section className={styles.myList}>
        <div className={`wrapper ${styles.myListWrapper}`}>
            <h2>My List:</h2>
            {props.favMovies.map(movie => {
              return (
                <div className="card">
                  <h3>{movie.original_title}</h3>
                  <img 
                  className={styles.searchResultsPoster}
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={`A poster for ${movie.title}`} 
                />
                </div>
              )
            })}
        </div>
    </section>
  )
}

export default MyList