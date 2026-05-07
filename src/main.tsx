import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Login from './login.tsx'
import Register from './frontend/register.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Login /> */}
    <Register />
  </StrictMode>,
)
