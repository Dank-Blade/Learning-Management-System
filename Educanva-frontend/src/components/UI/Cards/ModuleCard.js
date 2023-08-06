// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function ModuleCard({ module, id }) {
  const navigate = useNavigate();

  return (
    <Center py={6}>
      <Box
        position={"relative"}
        maxW={"340px"}
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
            ? navigate(`/teacher/module/${id}/content`)
            : navigate(`/module/${id}/content`);
        }}
      >
        <Box
          h={"100px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          rounded={"md"}
          pos={"relative"}
        >
          <Image
            src={"https://img.freepik.com/free-photo/front-view-stacked-books-ladders-education-day_23-2149241046.jpg?w=1380&t=st=1684581836~exp=1684582436~hmac=c9a90b35648a256f0cdf943d087b600af74db487f9abe89d46b0c2417db63c9f "}
            // layout={'fill'}
            objectFit={'cover'}
            height={"100px"}
            width={"100%"}
          />
        </Box>
        {/* <Avatar
            size={'lg'}
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
            position={'absolute'}
            left={'250'}
            top={'20'}

          /> */}
        <Stack width={"300px"} height={"110px"}>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Module
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {module}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}
