import './App.css';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import { Routes, Route } from 'react-router-dom';
import NavBar from './UI/NavBar';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import MyList from './components/MyList';
import {useState, useEffect} from 'react'
import firebase from './firebase';
import {getDatabase, ref, onValue} from 'firebase/database';


function App() {
  // const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favMovies, setFavMovies] = useState([]);


  // const handleFavoriteMovies = (savedFavoriteMovies) => {
  //   setFavoriteMovies(savedFavoriteMovies)
  //   console.log(favoriteMovies)
  // }

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push(data[key])
      }
      setFavMovies(newState)
    })
  }, []);

  console.log(favMovies)
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieID' element={<MovieDetails />} />
        <Route path='/results' element={<SearchResults />} /> 
        <Route path='/mylist' element={<MyList favMovies={favMovies}/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
