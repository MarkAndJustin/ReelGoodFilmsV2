import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
//Components
import NavBar from './UI/NavBar';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import MyList from './components/MyList';
//Utilities
import firebase from './firebase';
import {getDatabase, ref, onValue} from 'firebase/database';


function App() {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, 'favorite-movies/');
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push(data[key])
      }
      setFavMovies(newState)
    })
  }, []);

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
