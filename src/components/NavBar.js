import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav>
      <Link to='/'>
          <h2 className="logo">Reel Good Films</h2>      
      </Link>
    </nav>
  )
}

export default NavBar