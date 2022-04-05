import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//CSS Modules
import styles from "./NavBar.module.css";
//Components
import SearchForm from "./SearchForm";
import SearchFormMobile from "./SearchFormMobile";
import { useAuth } from "../store/AuthContext";
import { FaBars } from "react-icons/fa"
import { IoClose } from "react-icons/io5"


const NavBar = (props) => {
  const [fixNav, setFixNav] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setFixNav(true)
      } else {
        setFixNav(false)
      }
      
      setFixNav(window.scrollY > 10);
    });

    return () => {
      window.removeEventListener('scroll', null)
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
            <h2 className={styles.navLogo}>Reel Good Films</h2>      
          </Link>
          <ul className={styles.navList}>
            {!isLoggedIn && <li className={styles.navItem}>
              <Link className={styles.navLink} to='/'>
                Login              
              </Link>
            </li>}
            {isLoggedIn && <li className={styles.navItem}>
              <Link className={styles.navLink} to='/dashboard'>
                Profile              
              </Link>
            </li>}
            {isLoggedIn && <li className={`${styles.navItem} ${styles.myList}`}>
              <Link className={styles.navLink} to='/mylist'>
                My List
              </Link>
              {props.badgeLength > 0 && <span>{props.badgeLength}</span>}
            </li>}
          </ul>
        </div>
        {isLoggedIn && <SearchForm />}
        {isNavOpen ? 
          <IoClose onClick={handleMobileNavClose} className={styles.close}/> : 
          <FaBars onClick={handleMobileNav} className={styles.hamburger}/>}
      </div>
      {isNavOpen && 
        <ul className={styles.navListMobile}>
            {!isLoggedIn && <li className={styles.navItemMobile}>
              <Link className={styles.navLink} to='/'>
                Login              
              </Link>
            </li>}
            {isLoggedIn && <li className={styles.navItemMobile}>
              <Link className={styles.navLink} to='/dashboard'>
                Profile              
              </Link>
            </li>}
            {isLoggedIn && <li className={`${styles.navItem} ${styles.myList}`}>
              <Link className={styles.navLink} to='/mylist'>
                My List
              </Link>
              {props.badgeLength > 0 && <span>{props.badgeLength}</span>}
            </li>}
            {isLoggedIn && <li>
              <SearchFormMobile />
            </li>}
          </ul>}
    </nav>
  )
}

export default NavBar