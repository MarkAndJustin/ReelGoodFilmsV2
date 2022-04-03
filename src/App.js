import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
//Components
import NavBar from './UI/NavBar';
import Footer from './components/Footer';
import { PrivateRoute } from './components/PrivateRoute';
//Pages
import Home from './Pages/Home';
import MovieDetails from './Pages/MovieDetails';
import SearchResults from './Pages/SearchResults';
import MyList from './Pages/MyList';
//Auth Pages
import Signup from './AuthPages/Signup';
import Profile from './AuthPages/Dashboard';
import ForgotPassword from './AuthPages/ForgotPassword';
import Login from './AuthPages/Login';
import Dashboard from './AuthPages/Dashboard';
import UpdateProfile from './AuthPages/UpdateProfile';
//Utilities
import {getDatabase, ref, onValue, remove, push} from 'firebase/database';
import { AuthProvider } from './store/AuthContext';



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
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>}/>
        <Route path="/update-profile" element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>} />
        <Route path='/home' element={
          <PrivateRoute>
              <Home />
          </PrivateRoute>} />
        <Route path='/movie/:movieID' element={<MovieDetails handleAddMovie={handleAddMovie}/>} />
        <Route path='/results' element={<SearchResults />} /> 
        <Route path='/mylist' element={<MyList favMovies={favMovies} handleDeleteMovie={handleDeleteMovie}/>} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
