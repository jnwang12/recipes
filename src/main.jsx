import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'


import Recipes from './Recipes.jsx'
import Home from './Home.jsx'
import Projects from './Projects.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element = {<Home />} />
        <Route path ="/recipes" element = {<Recipes />} />
        <Route path ="/projects" element = {<Projects />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
