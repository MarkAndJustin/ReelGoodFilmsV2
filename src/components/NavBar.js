import { Link, useNavigate } from "react-router-dom"
import { IoIosSearch, IoMdClose } from "react-icons/io"
import { useState, useEffect } from "react"
import axios from "axios"

const NavBar = () => {
  const [isInputShown, setIsInputShown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  let navigate = useNavigate();

  const handleSearchClick = () => {
    setIsInputShown(true)
  }

  const handleSearchClose = () => {
    setIsInputShown(false)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('submitted')
    navigate('/results', {state: searchResults})
  }

  useEffect(()=>{
    axios({
      url: 'https://api.themoviedb.org/3/search/movie?query=spiderman',
      params: {
        api_key: 'abca8adda9e521b362fff5ab08ec8402', 
      }
    }).then((res) => {
      console.log(res)
      setSearchResults(res.data.results)
    })
  }, [])

  return (
    <nav>
      <div className="navWrapper">
        <Link to='/'>
          <h2 className="logo">Reel Good Films</h2>      
        </Link>
        <form action="" className="searchForm" onSubmit={handleFormSubmit} >
            {isInputShown ? <IoMdClose onClick={handleSearchClose} className="closeIcon" /> : <IoIosSearch className="searchIcon" onClick={handleSearchClick} /> }
            {isInputShown && <input type="text" placeholder="Search for a movie" />}
        </form>
      </div>
    </nav>
  )
}

export default NavBar