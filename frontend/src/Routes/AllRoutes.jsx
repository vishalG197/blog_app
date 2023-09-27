import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'

const AllRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/Signup" element={<Signup/>} />
      
    </Routes>
  )
}

export default AllRoutes
