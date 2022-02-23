import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav>
      <div className="wrapper">
        <Link to='/'>
          <h2 className="logo">Reel Good Films</h2>      
        </Link>
      </div>
    </nav>
  )
}

export default NavBar