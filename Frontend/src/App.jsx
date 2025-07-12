import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Designs from './pages/Designs'
import { Toaster } from 'react-hot-toast'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/designs" element={<Designs/>}/>
      <Route path='/signup'element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
