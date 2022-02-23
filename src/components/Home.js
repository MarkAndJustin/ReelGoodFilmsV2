import React from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {
    console.log(props.moviesList)
  return (
    <header>
        {props.moviesList.map(movie => {
            return (
                <ul>
                    <li>{movie.title}</li>
                    <li>
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="" />
                    </li>
                </ul>
            )
        })}
    </header>
  )
}

export default Home