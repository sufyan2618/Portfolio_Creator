import './App.css'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Designs from './pages/Designs'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import InfoPage from './pages/InfoPage'
import Profile from './pages/Profile'
import UpdateInfoPage from './pages/UpdateInfoPage'
import AddDesign from './pages/AddDesign'
import PortfolioPreview from './pages/PreviewPortfolio'
import ContactUs from './pages/ContactUs'
import Layout from './components/Layout'
import AdminLogin from './pages/AdminLogin'
import Deployed from './pages/Deployed'

import AdminProtectedRoute from './components/protectedRoutes/AdminProtectedRoute'
import InfoProtectedRoute from './components/protectedRoutes/InfoProtectedRoute'
import UserProtectedRoute from './components/protectedRoutes/UserProtectedRoute'

import useAdminStore from './Store/useAdminStore'
import useAuthStore from './Store/useAuthStore'

function App() {

  const {authUser, checkAuth, GetInfo, userInfo} = useAuthStore()
  const {adminUser, CheckAdminAuth, isCheckingAdminAuth} = useAdminStore()

  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    CheckAdminAuth();
  }
  , [CheckAdminAuth]);
  useEffect(() => {
    if (authUser) {
      GetInfo(authUser._id);
    }
  }
  , [authUser, GetInfo]);

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Layout> <Home/> </Layout>}/>
        <Route path="/designs" element={<Layout> <Designs/> </Layout>}/>
        <Route path="/contact_us" element={<Layout> <ContactUs/> </Layout>}/>
        <Route path='/signup' element={!authUser ?<Signup/> : <Navigate to="/"/>}/>
        <Route path='/signin' element={!authUser ? <Signin/> : <Navigate to="/"/>}/>
        <Route path="/admin/admin_login" element={!adminUser ? <AdminLogin/> : <Navigate to="/admin/add_design"/>}/>

        <Route element={<UserProtectedRoute/>}>
          <Route path="/profile/:id" element={<Layout> <Profile/> </Layout>}/>
          <Route path="/update_info" element={<Layout> <UpdateInfoPage/> </Layout>}/>
          <Route path="/portfolio_info" element={!userInfo ? <Layout> <InfoPage/> </Layout> : <Navigate to="/update_info"/>}/>
          <Route element={<InfoProtectedRoute/>}>
            <Route path="/portfolio_preview/:userId/:designId" element={<PortfolioPreview/>}/>
            <Route path='/deploy/:userId/:designId' element={<Deployed/>}/>
          </Route>
        </Route>

        <Route element={<AdminProtectedRoute/>}>
          <Route path="/admin/add_design" element={ <AddDesign/> }/>
        </Route>

      </Routes>
    <Toaster/>
    </>
  )
}

export default App
