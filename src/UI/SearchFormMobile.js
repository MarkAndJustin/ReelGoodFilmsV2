import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosSearch, IoMdClose} from "react-icons/io"
import styles from './SearchFormMobile.module.css';

const SearchFormMobile = () => {
    //State
    const [isInputShown, setIsInputShown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    //Allows for automatic redirect to a certain view/component
    let navigate = useNavigate();

    //Icon click controls.
    const handleSearchClick = () => {
        setIsInputShown(true);
    };

    const handleSearchClose = () => {
      setIsInputShown(false);
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      //Redirects to 'results' route on form submission.
      navigate('/results', {state: searchResults});
    };

    //Makes API call 
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
            {isInputShown ? 
              <IoMdClose 
                onClick={handleSearchClose} 
                className={styles.closeIcon}
                title="Close" 
              /> : 
              <IoIosSearch 
                className={styles.searchIcon} 
                onClick={handleSearchClick} 
                title="Search For A Movie"
              />}
            {isInputShown && 
              <input 
                type="text" 
                placeholder="Search for a movie" 
                value={searchQuery} 
                //Sets searchQuery state to the value of the event target. 
                onChange={e => setSearchQuery(e.target.value)} 
              />}
        </form>
      </>
    )
}

export default SearchFormMobile;