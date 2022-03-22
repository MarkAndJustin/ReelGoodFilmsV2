import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Icons
import { IoIosHeartEmpty } from "react-icons/io";
//CSS Modules
import styles from "./NavBar.module.css";
//Components
import SearchForm from "./SearchForm";

const NavBar = () => {
  const [fixNav, setFixNav] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setFixNav(window.scrollY > 10);
    });

    return () => {
      window.removeEventListener('scroll')
    }
  }, []);

  return (
    <nav className={`navbar ${fixNav && styles.navbarBackground}`}>
      <div className={styles.navWrapper}>
        <Link to='/'>
          <h2 className={styles.logo}>Reel Good Films</h2>      
        </Link>
        <div className={styles.navContainer}>
          <SearchForm />
          <Link to='/mylist'>
            <IoIosHeartEmpty className={styles.heart} title="My List" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar