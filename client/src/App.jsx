import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/accounts/Login'
import { GlobalProvider } from './components/GlobalProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import MyBlog from './components/MyBlog'
import AddBlog from './components/AddBlog'
import RouteProtection from './components/RouteProtection'

const App = () => {
  return (
    <div>
      <GlobalProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/myblog' element={<RouteProtection><MyBlog/></RouteProtection>} />
          <Route path='/addblog' element={<RouteProtection><AddBlog/></RouteProtection>} />
        </Routes>
      </Router>
      </GlobalProvider>
      <ToastContainer />
    </div>
  )
}

export default App