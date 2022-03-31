import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//CSS Modules
import styles from "./NavBar.module.css";
//Components
import SearchForm from "./SearchForm";
import { useAuth } from "../store/AuthContext";
import { FaBars } from "react-icons/fa"
import { IoClose } from "react-icons/io5"


const NavBar = () => {
  const [fixNav, setFixNav] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setFixNav(window.scrollY > 10);
    });

    return () => {
      window.removeEventListener('scroll')
    }
  }, []);

  const handleMobileNav = () => {
    setIsNavOpen(true);
  }

  const handleMobileNavClose = () => {
    setIsNavOpen(false);
  }

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
          {isLoggedIn && <SearchForm />}
          {isNavOpen ? <IoClose onClick={handleMobileNavClose} className={styles.close}/> : 
            <FaBars onClick={handleMobileNav} className={styles.hamburger}/>}
      </div>
      {isNavOpen && 
       <ul className={styles.navListMobile}>
            {!isLoggedIn && <li className={styles.navItemMobile}>
              <Link className={styles.navLink} to='/login'>
                Login              
              </Link>
            </li>}
            <li className={styles.navItemMobile}>
              <Link className={styles.navLink} to='/'>
                Profile              
              </Link>
            </li>
            <li className={styles.navItemMobile}>
              <Link className={styles.navLink} to='/mylist'>
                My List
              </Link>
            </li>
          </ul>}
    </nav>
  )
}

export default NavBar