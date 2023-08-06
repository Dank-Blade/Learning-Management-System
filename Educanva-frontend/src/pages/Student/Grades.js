import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Button,
  useToast,
  filter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Grades = () => {
  const [modules, setModules] = useState([]);
  const [submissionDetails, setSubmissionDetails] = useState([]);

  const nav = useNavigate();

  const toast = useToast();

  const id = jwtDecode(JSON.parse(localStorage.getItem("tokens")).access).id;

  useEffect(() => {
    if (!localStorage.getItem("tokens")) nav("/login/");

    if (
      jwtDecode(JSON.parse(localStorage.getItem("tokens")).access).user_type !==
      "Student"
    )
      nav("/login/");

    fetch(`http://127.0.0.1:8000/accounts/api/users/modules/${id}`, {
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
        setModules(data.modules);
      })
      .catch((error) => console.error(error));
  }, [nav]);

  const fetchSubmissionDetails = (id) => {
    fetch(`http://127.0.0.1:8000/file/submission/list/${id}/`, {
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
        setSubmissionDetails(data);
      })
      .catch((error) => console.error(error));
  };

  const filteredSubmissionDetails = submissionDetails.filter(
    (submission) => submission.uploaded_by === id
  );

  const downloadFile = (id) => {
    if (submissionDetails.length > 0) {
      window.open(`http://127.0.0.1:8000/file/submission/${id}`, "_blank");
    }
  };

  return (
    <Accordion allowToggle>
      {modules.map((item, index) => {
        return (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton
                onClick={() => {
                  fetchSubmissionDetails(item.id);
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  {item.module_name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>Assignment Topic</Th>
                      <Th>File</Th>
                      <Th>Marks</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredSubmissionDetails.map((submission, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{submission.assignment_name}</Td>
                          <Td
                            onClick={() => downloadFile(submission.id)}
                            cursor={"pointer"}
                          >
                            {submission.file.split("/")[5]}
                          </Td>
                          <Td>
                            {submission.marks === null
                              ? "TBD"
                              : submission.marks }
                          </Td>
                          <Td>
                            <Flex gap={2}></Flex>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Grades;
