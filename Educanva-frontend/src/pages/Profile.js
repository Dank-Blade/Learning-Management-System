import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useInput from "../hooks/useInput";
import jwtDecode from "jwt-decode";
import { useState } from "react";

const Profile = () => {
  const data = jwtDecode(JSON.parse(localStorage.getItem("tokens")).access);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/accounts/api/users/${data.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("tokens")).access
        }`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error(error));
  }, [data.id]);

  const firstNameInput = useInput(
    (value) => value.trim() !== "",
    data.first_name ?? ""
  );

  const lastNameInput = useInput(
    (value) => value.trim() !== "",
    data.last_name ?? ""
  );

  const emailInput = useInput(
    (value) => value.trim() !== "",
    data.email ?? ""
  );

  const formIsValid =
    firstNameInput.isValid && lastNameInput.isValid && emailInput.isValid;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const newData = {
      first_name: firstNameInput.value,
      last_name: lastNameInput.value,
      email: emailInput.value,
    };
    if (formIsValid) {
      formData.append("first_name", newData.first_name);
      formData.append("last_name", newData.last_name);
      formData.append("email", newData.email);
    }

    fetch(`http://127.0.0.1:8000/accounts/api/users/${data.id}/`, {
      method: "PATCH",
      body: formData,
      // body: JSON.stringify({
      //     first_name: newData.first_name,
      //     last_name: newData.last_name,
      //     email: newData.email,
      //     user_type: newData.user_type,
      //     password: newData.password,
      // }),

      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("tokens")).access
        }`,
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
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
          <HStack>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder="First name"
                defaultValue={firstNameInput.value}
                onChange={firstNameInput.valueChangeHandler}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                placeholder="Last name"
                defaultValue={lastNameInput.value}
                onChange={lastNameInput.valueChangeHandler}
              />
            </FormControl>
          </HStack>
        </Flex>

        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            type={"email"}
            defaultValue={emailInput.value}
            onChange={emailInput.valueChangeHandler}
          />
        </FormControl>

        <Button colorScheme="blue" mt={4} type={"submit"}>
          Edit
        </Button>
      </Flex>
    </div>
  );
};

export default Profile;
