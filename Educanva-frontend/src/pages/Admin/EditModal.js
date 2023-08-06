import React from "react";
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useInput from "../../hooks/useInput";

const EditModal = ({ isOpen, onClose, data, onEdit }) => {

  const firstNameInput = useInput(
    (value) => value.trim() !== "",
    data.first_name ?? ""
  );
  const lastNameInput = useInput(
    (value) => value.trim() !== "",
    data.last_name ?? ""
  );
  const emailInput = useInput((value) => value.trim() !== "", data.email ?? "");

  const formIsValid =
    firstNameInput.isValid && lastNameInput.isValid && emailInput.isValid;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const newData = {
        ...data, 
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
    }
    if (formIsValid) {
      formData.append("first_name", newData.first_name);
      formData.append("last_name", newData.last_name);
      formData.append("email", newData.email);
      formData.append("user_type", newData.user_type);
    }

    fetch(`http://127.0.0.1:8000/accounts/api/users/${data.id}/`, {
        method: "PUT",
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
      .then((response) => onEdit(newData))
      .catch((error) => console.error(error));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent as={"form"} onSubmit={submitHandler}>
        <ModalHeader>Edit account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} as={Flex} direction={"column"} gap={3}>
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
          <HStack>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type={"email"}
                defaultValue={emailInput.value}
                onChange={emailInput.valueChangeHandler}
              />
            </FormControl>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} type={"submit"}>
            Edit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
