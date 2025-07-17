// components/Layout.jsx
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout;