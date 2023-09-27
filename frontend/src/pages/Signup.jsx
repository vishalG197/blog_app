import React, { useState } from "react";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, AddIcon } from "@chakra-ui/icons";
import axios from "axios";

import { useToast } from "@chakra-ui/react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSiginup = async () => {
    const data = {
      username,
      avatar,
      email,
      password,
    };

    try {
      let res = await axios.post(
        "https://blog-bzw0.onrender.com/api/register",
        data
      );
      console.log(res);
      toast({
        title: "SignUp succefful.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Stack spacing={4}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            <AddIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <InputGroup
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
          <Button onClick={handleSiginup}>SignUp</Button>
        </InputGroup>
      </Stack>
    </Box>
  );
}

export default SignUp;
