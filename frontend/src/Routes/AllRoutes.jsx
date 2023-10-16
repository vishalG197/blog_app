import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/Signup';
import Login from '../pages/Login';


const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes;
