import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "./NavBar.module.css"
import SearchForm from "./SearchForm"

const NavBar = () => {
  const [fixNav, setFixNav] = useState(false)
  

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setFixNav(window.scrollY > 10);
    });

    return () => {
      window.removeEventListener('scroll')
    }
  }, [])

  return (
    <nav className={`navbar ${fixNav && 'navbar-background'}`}>
      <div className={styles.navWrapper}>
        <Link to='/'>
          <h2 className={styles.logo}>Reel Good Films</h2>      
        </Link>
        <SearchForm />
      </div>
    </nav>
  )
}

export default NavBar