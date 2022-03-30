import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//CSS Modules
import styles from "./NavBar.module.css";
//Components
import SearchForm from "./SearchForm";
import { useAuth } from "../store/AuthContext";


const NavBar = () => {
  const [fixNav, setFixNav] = useState(false);
  const { isLoggedIn } = useAuth();

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
        <div className={styles.navContainer}>
          <Link to='/home'>
            <h2 className={styles.logo}>Reel Good Films</h2>      
          </Link>
          <ul className={styles.navList}>
            {!isLoggedIn && <li className={styles.navItem}>
              <Link className={styles.navLink} to='/login'>
                Login              
              </Link>
            </li>}
            <li className={styles.navItem}>
              <Link className={styles.navLink} to='/'>
                Profile              
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to='/mylist'>
                My List
              </Link>
            </li>
          </ul>
        </div>
          <SearchForm />          
      </div>
    </nav>
  )
}

export default NavBar