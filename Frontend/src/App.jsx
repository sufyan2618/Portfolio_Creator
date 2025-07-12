import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Designs from './pages/Designs'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/designs" element={<Designs/>}/>
    </Routes>
    </>
  )
}

export default App
