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
import ContactUs from './pages/ContactUs'
import Layout from './components/Layout'
import AdminLogin from './pages/AdminLogin'
import Deployed from './pages/Deployed'
import { useEffect } from 'react'
import useAdminStore from './Store/useAdminStore'
import AddDesignSkeleton from './components/skeletons/AddDesignSkeleton'
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
      <Route path="/" element={<Layout>  <Home/> </Layout>}/>
      <Route path="/designs" element={<Layout> <Designs/> </Layout>}/>
      <Route path='/signup'element={!authUser ? <Signup/> : <Navigate to="/"/>}/>
      <Route path='/signin' element={!authUser ? <Signin/> : <Navigate to="/"/>}/>
      <Route path='/portfolio_info' element={authUser ? <Layout><InfoPage/></Layout> : <Navigate to="/signin"/> }/>
      <Route path='/profile/:id' element={authUser ?<Layout> <Profile/> </Layout> : <Navigate to="/signin"/>}/>
      <Route path='/update_info' element={authUser ?<Layout> <UpdateInfoPage/> </Layout> : <Navigate to="/signin"/>}/>
      <Route path='/admin/add_design' element={isCheckingAdminAuth ?(<AddDesignSkeleton/>) : (adminUser ? <AddDesign/> : <AdminLogin/>) }/>
      <Route path='/contact_us' element={<Layout> <ContactUs/> </Layout>}/>
      <Route path='/portfolio_preview/:userId/:designId' element={authUser ? (userInfo ? (<PortfolioPreview/>) : (<Navigate to="/portfolio_info"/>)): (<Navigate to="/signin"/>)}/>
      <Route path='/admin/admin_login' element={!adminUser ? <AdminLogin/> : <Navigate to="/admin/add_design"/>}/>
      <Route path='/deploy/:id/:designId'element={authUser ? (userInfo ? (<Deployed/>) : (<Navigate to="/portfolio_info"/>)): (<Navigate to="/signin"/>)}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
