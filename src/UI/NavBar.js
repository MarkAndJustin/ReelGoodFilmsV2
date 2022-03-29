import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//CSS Modules
import styles from "./NavBar.module.css";
//Components
import SearchForm from "./SearchForm";


const NavBar = () => {
  const [fixNav, setFixNav] = useState(false);
  // const navigate = useNavigate();

  // const authCtx = useContext(AuthContext);

  // const isLoggedIn = authCtx.isLoggedIn;

  // const handleLogout = () => {
  //   authCtx.logout();
  //   navigate('/')
  // }

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
          {/* <ul className={styles.navList}>
            {!isLoggedIn && (
              <li>
                <Link to='/'>
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
            {isLoggedIn && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
            <li>
              <Link to='/mylist'>
                My List
              </Link>
            </li>
          </ul> */}
        </div>
          <SearchForm />          
      </div>
    </nav>
  )
}

export default NavBar