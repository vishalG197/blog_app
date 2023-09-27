import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Flex justifyContent={"space-evenly"}>
        <Button><Link to="/">Dashborad</Link></Button>
        <Button><Link to="/Signup">SignUp</Link></Button>
        <Button><Link to="/login">Login</Link></Button>
    </Flex>
  )
}

export default Navbar