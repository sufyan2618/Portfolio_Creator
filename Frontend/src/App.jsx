import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Designs from './pages/Designs'
import { Toaster } from 'react-hot-toast'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import InfoPage from './pages/InfoPage'
import Profile from './pages/Profile'
import UpdateInfoPage from './pages/UpdateInfoPage'
import useAuthStore from './Store/useAuthStore'
import AddDesign from './pages/AddDesign'
import PortfolioPreview from './pages/PreviewPortfolio'

import { useEffect } from 'react'
function App() {

  const {authUser, checkAuth, GetInfo} = useAuthStore()


  useEffect(() => {
    const fetchAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    const fetchData = async () => {
      if (authUser) {
        try {
          await GetInfo(authUser._id);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    }
    fetchData();
    fetchAuth();
  }
  , [checkAuth, authUser]);


  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/designs" element={<Designs/>}/>
      <Route path='/signup'element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/portfolio_info' element={<InfoPage/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/update_info' element={<UpdateInfoPage/>}/>
      <Route path='/add_design' element={<AddDesign/>}/>
      <Route path='/portfolio_preview/:userId/:designId' element={<PortfolioPreview/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
