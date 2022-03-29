import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
//Components
import NavBar from './UI/NavBar';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import SearchResults from './components/SearchResults';
import MyList from './components/MyList';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Profile from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UpdateProfile from './components/UpdateProfile';
import { AuthProvider } from './store/AuthContext';
//Utilities
import {getDatabase, ref, onValue, remove, push} from 'firebase/database';


function App() {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const database = getDatabase();
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
    const database = getDatabase();
    const dbRef = ref(database, `favorite-movies/${movie}`);
    remove(dbRef)
  }

  const handleAddMovie = (movie) => {
    const database = getDatabase();
    const dbRef = ref(database, `favorite-movies/`);
    push(dbRef, movie);
  }

  return (
    <div className='app'>
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>}/>
        <Route path="/update-profile" element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>} />
        <Route path='/home' element={<Home />} />
        <Route path='/movie/:movieID' element={<MovieDetails handleAddMovie={handleAddMovie}/>} />
        <Route path='/results' element={<SearchResults />} /> 
        <Route path='/mylist' element={<MyList favMovies={favMovies} handleDeleteMovie={handleDeleteMovie}/>} />
      </Routes>
      <Footer />
    </AuthProvider>
    </div>
  );
}

export default App;
