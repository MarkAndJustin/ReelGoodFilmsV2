import { Link, useNavigate } from "react-router-dom"
import { IoIosSearch, IoMdClose } from "react-icons/io"
import { useState } from "react"

const NavBar = () => {
  const [isInputShown, setIsInputShown] = useState(false);
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
    navigate('/results')
  }

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