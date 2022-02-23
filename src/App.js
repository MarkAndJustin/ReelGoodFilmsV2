import './App.css';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Movies from './components/Movies';

function App() {
  return (
    <>
      <NavBar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieID' element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
