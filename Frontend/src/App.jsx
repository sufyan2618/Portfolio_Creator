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
function App() {

  const {authUser, checkAuth, GetInfo, userInfo} = useAuthStore()
  const {adminUser, CheckAdminAuth} = useAdminStore()

  useEffect(() => {
    checkAuth();
    console.log(authUser)
  }, [])

  useEffect(() => {
    CheckAdminAuth();
    console.log(adminUser)
  }
  , [CheckAdminAuth]);
  useEffect(() => {
    if (authUser) {
      GetInfo(authUser._id);
    }
    console.log(userInfo);
  }
  , [authUser, GetInfo]);

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout>  <Home/> </Layout>}/>
      <Route path="/designs" element={<Layout> <Designs/> </Layout>}/>
      <Route path='/signup'element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/portfolio_info' element={<Layout><InfoPage/></Layout>}/>
      <Route path='/profile/:id' element={<Layout> <Profile/> </Layout>}/>
      <Route path='/update_info' element={<Layout> <UpdateInfoPage/> </Layout>}/>
      <Route path='/admin/add_design' element={adminUser ? <AddDesign/> : <AdminLogin/> }/>
      <Route path='/contact_us' element={<Layout> <ContactUs/> </Layout>}/>
      <Route path='/portfolio_preview/:userId/:designId' element={ <PortfolioPreview/>}/>
      <Route path='/admin/admin_login' element={<AdminLogin/>}/>
      <Route path='/deploy/:id/:designId' element={<Deployed/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
