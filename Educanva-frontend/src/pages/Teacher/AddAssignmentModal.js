import React from "react";
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Box,
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
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import { useState } from "react";
let file = null;

const AddAssignmentModal = ({ isOpen, onClose, onSubmit }) => {
  const nameInput = useInput((value) => value.trim() !== "");
  const descriptionInput = useInput((value) => value.trim() !== "");
  //   const fileInput = useInput((value) => value instanceof File);
  const fileInput = useInput((value) => value !== null);
  const dueDateInput = useInput((value) => value !== null);
  const dueTimeInput = useInput((value) => value !== null);

  const fileChangeHandler = (event) => {
    file = event.target.files[0];
  };

  const userData = jwtDecode(JSON.parse(localStorage.getItem("tokens")).access);

  const moduleId = useParams();

  const formIsValid =
    nameInput.isValid && descriptionInput.isValid && fileInput.isValid && dueDateInput.isValid && dueTimeInput.isValid;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const newData = {
      name: nameInput.value,
      description: descriptionInput.value,
      file: file,
      module: moduleId.id,
      uploaded_by: userData.id,
      content_type: "Assignment",
      due_date: dueDateInput.value,
      due_time: dueTimeInput.value
    };

    if (formIsValid) {
      formData.append("name", newData.name);
      formData.append("description", newData.description);
      formData.append("file", newData.file);
      formData.append("module", newData.module);
      formData.append("uploaded_by", newData.uploaded_by);
      formData.append("content_type", newData.content_type);
      formData.append("due_date", newData.due_date);
      formData.append("due_time", newData.due_time);
    }

    fetch(`http://127.0.0.1:8000/file/upload/`, {
      method: "POST",
      body: formData,

      headers: {
        // "Content-Type": "multipart/form-data",
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("tokens")).access
        }`,
      },
    })
      .then((response) => onSubmit(newData))
      .catch((error) => console.error(error));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        as={"form"}
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <ModalHeader>Add Assignment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} as={Flex} direction={"column"} gap={3}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              defaultValue={nameInput.value}
              onChange={nameInput.valueChangeHandler}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              defaultValue={descriptionInput.value}
              onChange={descriptionInput.valueChangeHandler}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Due Date</FormLabel>
            <HStack>
              <Input type={"date"} onChange={dueDateInput.valueChangeHandler}/>
              <Input type={"time"} onChange={dueTimeInput.valueChangeHandler}/>
            </HStack>
          </FormControl>

          <HStack>
            <FormControl>
              <FormLabel>File</FormLabel>
              <Input type={"file"} onChange={fileChangeHandler} />
            </FormControl>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} type={"submit"}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAssignmentModal;
