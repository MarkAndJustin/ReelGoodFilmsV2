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
import SignIn from './components/SignIn';
import AuthForm from './Auth/AuthForm';
import Profile from './components/Profile';
//Utilities
import firebase from './firebase';
import {getDatabase, ref, onValue, remove, push} from 'firebase/database';


function App() {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, 'favorite-movies/');
    //Response represents the list of data in DB
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      //Key represents unique key of each obj in firebase
      for (let key in data) {
        //Changes movie item to an obj with a key for each movie. 
        newState.push({name: key, data: data[key]})
      }
      setFavMovies(newState)
    })
  }, []);

  //The problem is that there needs to be a ref for the specific movie, right now removes everything
  const handleDeleteMovie = (movie) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `favorite-movies/${movie}`);
    remove(dbRef)
  }

  const handleAddMovie = (movie) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `favorite-movies/`);
    push(dbRef, movie);
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path='/auth' element={<AuthForm />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieID' element={<MovieDetails handleAddMovie={handleAddMovie}/>} />
        <Route path='/results' element={<SearchResults />} /> 
        <Route path='/mylist' element={<MyList favMovies={favMovies} handleDeleteMovie={handleDeleteMovie}/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
