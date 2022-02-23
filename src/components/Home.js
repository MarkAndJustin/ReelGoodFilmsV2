import React from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {
    console.log(props.moviesList)
  return (
    <header>
        {props.moviesList.map(movie => {
            return (
                <ul className='movieList'>
                    <li>{movie.title}</li>
                    <li>
                        <Link to={`/movie/${movie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="" />
                        </Link>
                    </li>
                </ul>
            )
        })}
    </header>
  )
}

export default Home