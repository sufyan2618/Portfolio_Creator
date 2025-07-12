import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Header from './components/Header.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Header />
    <App />
  </BrowserRouter>
)
