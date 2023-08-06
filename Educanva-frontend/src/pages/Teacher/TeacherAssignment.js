import { useEffect, useState } from "react";
import AssignmentCard from "../../components/UI/Cards/AssignmentCard";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ModuleNavbar from "../../components/UI/ModuleNavbar";
import DrawerModule from "../../components/UI/DrawerModule";
import React from "react";
import AddAssignments from "../../components/UI/Cards/AddAssignments";
import { useNavigate, useParams } from "react-router-dom";

const TeacherAssignment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const id = useParams().id;

  const [assignments, setAssignments] = useState([]);

  const nav = useNavigate();

  const fetchContents = () => {
    fetch(`http://127.0.0.1:8000/file/list/${id}/`, {
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
        setAssignments(data);
      })
      .catch((error) => console.error(error));
  };


  const filteredAssignments = assignments.filter(
    (item) => item.content_type === "Assignment"
  );

  useEffect(() => {
    if (!localStorage.getItem("tokens")) nav("/login/");
    fetchContents();
  }, [nav]);

  const updatedData = (newData) => {
    setAssignments([...assignments, newData]);
  };

  return (
    <>
      <ModuleNavbar onOpen={onOpen} />
      <DrawerModule isOpen={isOpen} onClose={onClose} />

      <Flex
        gap={"32px"}
        align={"flex-start"}
        alignItems={"flex-start"}
        justifyContent={"center"}
      >
        <Flex pt={"20px"}>
          <AddAssignments updatedData={updatedData} />
        </Flex>
        <Flex
          flexDirection={"column"}
          width={"relative"}
          minW={"740px"}
          alignContent={""}
        >
          {filteredAssignments.map((item, index) => {
            return (
              <AssignmentCard
                key={index}
                heading={item.name}
                assignmentId={item.id}
              />
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default TeacherAssignment;
