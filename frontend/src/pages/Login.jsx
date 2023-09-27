import React, { useState } from "react";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };

    try {
      let res = await axios.post(
        "https://blog-bzw0.onrender.com/api/login",
        data
      );
      console.log(res);
      const token = res.data.token;
      localStorage.setItem("token", token);
      toast({
        title: "Login successful.",
        description: "We've logged in your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed.",
        description: "There is some problem with login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <LockIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <Button onClick={handleLogin}>LogIn</Button>
      </InputGroup>
    </Stack>
  );
}

export default LogIn;
