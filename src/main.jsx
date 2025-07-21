import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CollegeFinder from './CollegeFinder.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CollegeFinder />
  </StrictMode>,
)
