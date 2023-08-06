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

const EditModuleModal = ({ isOpen, onClose, data, onEdit }) => {
  const moduleCodeInput = useInput(
    (value) => value.trim() !== "",
    data.module_code ?? ""
  );

  const moduleNameInput = useInput(
    (value) => value.trim() !== "",
    data.module_name ?? ""
  );

  const formIsValid = moduleCodeInput.isValid && moduleNameInput.isValid;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const newData = {
      ...data,
      module_code: moduleCodeInput.value,
      module_name: moduleNameInput.value,
    };
    if (formIsValid) {
      formData.append("module_code", newData.module_code);
      formData.append("module_name", newData.module_name);
    }

    fetch(`http://127.0.0.1:8000/module/api/modules/${data.id}/`, {
      method: "PUT",
      body: formData,
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
        <ModalHeader>Edit Module</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} as={Flex} direction={"column"} gap={3}>
          <FormControl>
            <FormLabel>Module Code</FormLabel>
            <Input
              placeholder="Module Code"
              defaultValue={moduleCodeInput.value}
              onChange={moduleCodeInput.valueChangeHandler}
            />
          </FormControl>

          <HStack>
            <FormControl>
              <FormLabel>Module Name</FormLabel>
              <Input
                placeholder="Module Name"
                defaultValue={moduleNameInput.value}
                onChange={moduleNameInput.valueChangeHandler}
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

export default EditModuleModal;
