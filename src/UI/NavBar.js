import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
//CSS Modules
import styles from "./NavBar.module.css";
//Components
import SearchForm from "./SearchForm";

import AuthContext from '../store/auth-context'

const NavBar = () => {
  const [fixNav, setFixNav] = useState(false);

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

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
          <Link to='/'>
          <h2 className={styles.logo}>Reel Good Films</h2>      
        </Link>
          <ul className={styles.navList}>
            {!isLoggedIn && (
              <li>
                <Link to='/auth'>
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to='/profile'>
                  My Profile
                </Link>
              </li>
            )}
            <li>
              <Link to='/mylist'>
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