import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'

const AllRoutes = () => {
  return (
    <Routes>
       
      <Route path="/Signin" elements={<Login/>} />
      <Route path="/Signup" elements={<Signup/>} />
      <Route path="/Blogs" elements={<Dashboard/>} />
    </Routes>
  )
}

export default AllRoutes
