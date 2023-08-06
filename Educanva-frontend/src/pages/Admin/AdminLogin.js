import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  // Link,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import jwtDecode from "jwt-decode";

export default function AdminLogin() {
  let { loginUser } = useContext(AuthContext);
  const emailInput = useRef();
  const passwordInput = useRef();

  const nav = useNavigate();

  const toast = useToast();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    })
      .then((response) => {
          const userType = jwtDecode(response.access).user_type;

          if (userType === "Admin") {
            nav("/admin/students");
          }
          else {
            toast({
                title: "Not an admin",
                description: "Need admin credentials to login",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            nav("/admin/login");
          } 
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
  
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={submitHandler}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" ref={emailInput} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" ref={passwordInput} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
