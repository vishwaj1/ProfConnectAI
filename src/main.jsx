import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Professors from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Professors/>
  </StrictMode>,
)
