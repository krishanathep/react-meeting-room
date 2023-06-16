import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WithNavbar from './layouts/WithNavbar';
import WithOutnavbar from './layouts/WithOutnavbar';
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Home from './pages/home'
import Meeting from './pages/meeting';
import MeetingVew from './pages/meeting/view'
import MeetingCreate from './pages/meeting/create'
import Blogs from './pages/blogs'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<WithOutnavbar/>}>
          <Route path='/auth/signin' element={<Signin/>}/>
          <Route path='/auth/signup' element={<Signup/>}/>
        </Route>
        <Route element={<WithNavbar/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/meetings/' element={<Meeting/>}/>
          <Route path='/meetings/view/:id' element={<MeetingVew/>}/>
          <Route path='/meetings/create' element={<MeetingCreate/>}/>

          <Route path='/blogs' element={<Blogs/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
