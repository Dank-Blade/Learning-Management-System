import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AddContentModal from "../../../pages/Teacher/AddContentModal";

const AddContents = ({updatedData}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const submitHandler = (newData) => {
    setIsModalOpen(false);
    updatedData(newData);
    toast({
      title: "Content added.",
      description: "Content added to the module.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card width={"320px"} boxShadow={"md"}>
      <CardHeader>
        <Heading size="md">Add Content</Heading>
      </CardHeader>

      <CardFooter>
        <Button width={"full"} onClick={openModal}>
          Add
          {isModalOpen && (
            <AddContentModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
              }}
              onSubmit={submitHandler}
            />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddContents;
