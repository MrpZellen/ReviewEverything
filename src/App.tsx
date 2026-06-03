
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import MovieDetails from './pages/MovieDetailsPage';
import ActorDetails from './pages/ActorDetailsPage';
import Login from './login';
import ReviewsPage from './pages/ReviewsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
        <Route path='/actor/:id' element={<ActorDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reviews' element={<ReviewsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>

      
    </BrowserRouter>
    
  );
}

export default App;
