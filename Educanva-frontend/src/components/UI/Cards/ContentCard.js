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
import jwtDecode from "jwt-decode";
import { AiOutlineBook } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

export default function ContentCard({ heading, contentId }) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Center py={6}>
      <Box
        position={"relative"}
        maxW={"740px"}
        maxH={"80px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"md"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        cursor={"pointer"}
        onClick={() => {
          jwtDecode(JSON.parse(localStorage.getItem("tokens")).access)
            .user_type === "Teacher"
            ? navigate(`/teacher/module/${id}/content/${contentId}`)
            : navigate(`/module/${id}/content/${contentId}`);
        }}
      >
        {/* <Box
            h={'100px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            rounded={'md'}
            pos={'relative'}> */}
        {/* <Image
              src={
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }
              layout={'fill'}
            /> */}
        {/* </Box> */}
        {/* <Avatar
              size={'lg'}
              src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
              alt={'Author'}
              position={'absolute'}
              left={'250'}
              top={'20'}
  
            /> */}
        <Flex align={"center"}>
          <Icon as={AiOutlineBook} color="green.500" boxSize={6} />
          <Stack width={"300px"} height={"20px"} px={"2rem"}>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {heading}
            </Text>
            {/* <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {module}
            </Heading> */}
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
}
