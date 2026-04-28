
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
