import { IoIosSearch, IoMdClose} from "react-icons/io"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from './SearchForm.module.css'

const SearchForm = () => {
    
    const [isInputShown, setIsInputShown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
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
      navigate('/results', {state: searchResults})
    }

    useEffect(()=>{
      axios({
        url: `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,
        params: {
          api_key: 'abca8adda9e521b362fff5ab08ec8402', 
        }
      }).then((res) => {
        setSearchResults(res.data.results)
      }).catch((error) => {
        if(error.response) {
          console.log(error.response)
        }
      })
    }, [searchQuery]);


    return (
      <>
        <form className={styles.searchForm} onSubmit={handleFormSubmit} >
            {isInputShown ? <IoMdClose onClick={handleSearchClose} className={styles.closeIcon} /> : <IoIosSearch className={styles.searchIcon} onClick={handleSearchClick} /> }
            {isInputShown && <input type="text" placeholder="Search for a movie" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />}
        </form>
      </>
    )
}

export default SearchForm