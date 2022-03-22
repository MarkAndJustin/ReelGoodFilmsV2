import React from 'react';
import styles from './MyList.module.css';
import { Link } from "react-router-dom"
import { BsTrash } from "react-icons/bs";
import firebase from '../firebase';
import {getDatabase, ref, remove} from 'firebase/database';

const MyList = (props) => {

  const handleDeleteMovie = (movie) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, 'favorite-movies/');
    remove(dbRef, movie)
  }

  return (
    <section className={styles.myList}>
        <div className={`wrapper ${styles.myListWrapper}`}>
          <h2>My List:</h2>
            <div className={styles.cardContainer}>
              {props.favMovies.map(movie => {
                return (
                  <Link to={`/movie/${movie.id}`}>
                    <div className={styles.card}>
                      <h3>{movie.original_title}</h3>
                      <BsTrash onClick={handleDeleteMovie}/>
                      <img 
                        className={styles.searchResultsPoster}
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={`A poster for ${movie.title}`} 
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
        </div>
    </section>
  )
}

export default MyList