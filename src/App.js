import './App.css';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieID' element={<MovieDetails />} />
        <Route path='/results' element={<SearchResults />} /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;
