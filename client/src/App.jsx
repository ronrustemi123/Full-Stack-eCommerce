import './App.css'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Product from './pages/Product'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Login from './pages/Login'
import Signup from './pages/Signup'

import {Routes, Route, Navigate} from 'react-router-dom'
import Newsletter from './components/Newsletter'

import { useUserContext } from './hooks/useUserContext'

function App() {

  const {user} = useUserContext()

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<><Home/><Newsletter/><Footer/></>}/>
        <Route path='/categories/:category' element={<><Categories/><Newsletter/><Footer/></>}/>
        <Route path='/product' >
          <Route path=':id' element={<><Product/><Newsletter/><Footer/></>}/>
        </Route>
        <Route path='/login' element={!user ? <Login/> : <Navigate to={'/'}><><Home/><Newsletter/><Footer/></></Navigate>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to={'/'}><><Home/><Newsletter/><Footer/></></Navigate>}/>
      </Routes>

    </>
  )
}

export default App
