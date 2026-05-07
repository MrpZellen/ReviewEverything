
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import MovieDetails from './pages/MovieDetailsPage';
import ActorDetails from './pages/ActorDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
        <Route path='/actor/:id' element={<ActorDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
