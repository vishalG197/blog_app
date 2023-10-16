
import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      backgroundColor="blue.500"
      color="white" 
      padding="1rem" 
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Button size="md">
        <Link to="/dashboard">Dashboard</Link>
      </Button>
      <Button size="md">
        <Link to="/">Sign Up</Link>
      </Button>
      <Button size="md">
        <Link to="/login">Log In</Link>
      </Button>
    </Box>
  );
};

export default Navbar