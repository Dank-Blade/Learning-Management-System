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
import { AiOutlineBook } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import ImageCard from "./ImageCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailedContentCard() {
  const params = useParams();
  const id = params.id;
  const contentId = params.contentId;

  const [contentDetails, setContentDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  //
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
        setContentDetails(data);
      })
      .catch((error) => console.error(error));
  }, []);


  useEffect(() => {
    if (contentDetails.length > 0) {
      fetch(
        `http://127.0.0.1:8000/accounts/api/users/${contentDetails[0]?.uploaded_by}`,
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
  }, [contentDetails]);


  const filteredContentDetails = contentDetails.filter((item) => item.id === parseInt(contentId))


  return (
    <Center py={6}>
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
        // cursor={"pointer"}
      >
        <Flex
          align={"center"}
          alignItems={"flex-start"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <Flex>
            <Icon as={AiOutlineBook} color="green.500" boxSize={6} />
            <Stack width={"300px"} px={"2rem"}>
              <Text
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                {filteredContentDetails[0]?.name}
              </Text>
            </Stack>
          </Flex>
          <Flex
            borderBottom={"1px solid"}
            borderColor={"gray.200"}
            width={"full"}
          >
            <Text>{userDetails.first_name} {userDetails.last_name}</Text>
            <Icon as={BsDot} color="gray.500" boxSize={7} />
            <Text>{filteredContentDetails[0]?.created_at.split('T')[0]}</Text>
          </Flex>

          <Flex maxH={"90px"} maxW={"370px"}>
            <ImageCard contentDetails={filteredContentDetails} contentId={contentId}/>
          </Flex>

          <Flex alignItems={'end'} height={70}>
            <Text>{filteredContentDetails[0]?.description}</Text>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
}
