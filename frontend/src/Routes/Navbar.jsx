import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to="/">Dashborad</Link>
        <Link to="/Signup">SignUp</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default Navbar