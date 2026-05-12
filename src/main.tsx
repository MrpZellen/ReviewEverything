import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Login from './login.tsx'
// import SearchPage from './pages/SearchPage.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Login /> */}
    {/* <SearchPage/> */}
    <App/>
  </StrictMode>,
)
