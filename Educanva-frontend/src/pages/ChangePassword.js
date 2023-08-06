import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import AuthContext from "../context/AuthContext";

const ChangePassword = () => {
  let { changePassword } = useContext(AuthContext);

  const data = jwtDecode(JSON.parse(localStorage.getItem("tokens")).access);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [userData, setUserData] = useState({});

  const toast = useToast();

  const submitHandler = (e) => {
    e.preventDefault();

    if (userData.new_password !== userData.confirm_new_password) {
      toast({
        title: "Invalid Password.",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    changePassword({
      old_password: userData.old_password,
      new_password: userData.new_password,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast({
            title: "Password Changed.",
            description: "Successfully changed.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
        setUserData({});
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Password Change Failed.",
          description: "Failed to change password.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Flex as={"form"} onSubmit={submitHandler} direction="column">
        <Flex direction="column">
          <FormControl>
            <FormLabel>Old Password</FormLabel>
            <InputGroup>
              <Input
                type={!showPassword ? "password" : "text"}
                placeholder="Old Password"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    old_password: e.target.value,
                  }))
                }
              />
              <InputRightElement
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                type={!showNewPassword ? "password" : "text"}
                placeholder="New Password"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    new_password: e.target.value,
                  }))
                }
              />
              <InputRightElement
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {!showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Flex>

        <FormControl mt={4}>
          <FormLabel>Confirm New Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Confirm New Password"
              type={!showConfirmPassword ? "password" : "text"}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  confirm_new_password: e.target.value,
                }))
              }
            />
            <InputRightElement
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {!showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button colorScheme="blue" mt={4} type={"submit"}>
          Change Password
        </Button>
      </Flex>
    </div>
  );
};

export default ChangePassword;
