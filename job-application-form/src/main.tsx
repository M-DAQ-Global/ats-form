import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegularApplication from './pages/RegularApplication'
import ApplicationSuccess from './pages/ApplicationSuccess'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegularApplication />}></Route>
        <Route path='/application' element={<RegularApplication />}></Route>
        <Route path='/application/success' element={<ApplicationSuccess />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
