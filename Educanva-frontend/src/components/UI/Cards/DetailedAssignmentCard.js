// import Image from 'next/image';
import {
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { TiClipboard } from "react-icons/ti";
import { BsDot } from "react-icons/bs";
import ImageCard from "./ImageCard";
import SubmitPortal from "./SubmitPortal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export default function DetailedAssignmentCard() {
  const params = useParams();
  const id = params.id;
  const assignmentId = params.assignmentId;

  const [assignmentDetails, setAssignmentDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/file/list/${id}`, {
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
        setAssignmentDetails(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (assignmentDetails.length > 0) {
      fetch(
        `http://127.0.0.1:8000/accounts/api/users/${assignmentDetails[0]?.uploaded_by}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("tokens")).access
            }`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUserDetails(data);
        })
        .catch((error) => console.error(error));
    }
  }, [assignmentDetails]);

  const filteredAssignmentDetails = assignmentDetails.filter(
    (item) => item.id === parseInt(assignmentId)
  );


  return (
    <Center py={6}>
      <Flex
        gap={"20px"}
        width={"full"}
        alignItems={"flex-start"}
        justifyContent={"center"}
      >
        <Box
          position={"relative"}
          maxW={"800px"}
          height={"300px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"md"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
          cursor={"pointer"}
        >
          <Flex
            align={"center"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            gap={"10px"}
          >
            <Flex>
              <Icon as={TiClipboard} color="green.500" boxSize={6} />
              <Stack width={"300px"} px={"2rem"}>
                <Text
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  {filteredAssignmentDetails[0]?.name}
                </Text>
              </Stack>
            </Flex>
            <Flex
              borderBottom={"1px solid"}
              borderColor={"gray.200"}
              width={"full"}
              paddingBottom={"5px"}
              justifyContent={"space-between"}
            >
              <Flex>
                <Text>
                  {userDetails.first_name} {userDetails.last_name}
                </Text>
                <Icon as={BsDot} color="gray.500" boxSize={7} />
                <Text>
                  {filteredAssignmentDetails[0]?.created_at.split("T")[0]}
                </Text>
              </Flex>
              <Flex gap={2}>
                <Text>Due Date:</Text>
                <Text>{filteredAssignmentDetails[0]?.due_date}</Text>
                <Text>{filteredAssignmentDetails[0]?.due_time}</Text>
              </Flex>
            </Flex>

            <Flex maxH={"90px"} maxW={"370px"}>
              <ImageCard
                contentDetails={filteredAssignmentDetails}
                contentId={assignmentId}
              />
            </Flex>
          </Flex>
        </Box>
        {jwtDecode(JSON.parse(localStorage.getItem("tokens")).access)
          .user_type === "Student" ? (
          <SubmitPortal dueDate={filteredAssignmentDetails[0]?.due_date} dueTime={filteredAssignmentDetails[0]?.due_time} />
        ) : null}
      </Flex>
    </Center>
  );
}
