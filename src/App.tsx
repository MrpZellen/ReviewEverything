
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import MovieDetails from './pages/MovieDetailsPage';
import Login from './login';
import WriteReviews from './components/reviews/WriteReviews';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
        <Route path='/login' element={<Login/>}/>

        {/* Test Route for Write Reviews */}
        <Route path='/write-review/:movieID' element={<WriteReviews movieID="1"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
