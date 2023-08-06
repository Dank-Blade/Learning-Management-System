import { Flex, useDisclosure } from "@chakra-ui/react";
import ModuleNavbar from "../../components/UI/ModuleNavbar";
import DrawerModule from "../../components/UI/DrawerModule";
import ContentCard from "../../components/UI/Cards/ContentCard";
import { useEffect, useState } from "react";
import AddContents from "../../components/UI/Cards/AddContents";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const TeacherContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  const id = useParams().id;

  const [contents, setContents] = useState([]);

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
        setContents(data);
      })
      .catch((error) => console.error(error));
  };

  const filteredContents = contents.filter((item) => item.content_type === "Content");

  useEffect(() => {
    if (!localStorage.getItem("tokens")) nav("/login/");
    fetchContents();
  }, [nav]);

  const updatedData = (newData) => {
    setContents([...contents, newData]);
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
          <AddContents updatedData={updatedData}/>
        </Flex>
        <Flex
          flexDirection={"column"}
          width={"relative"}
          minW={"740px"}
          alignContent={""}
        >
          {filteredContents.map((item, index) => {
            return (
              <ContentCard
                key={index}
                heading={item.name}
                contentId={item.id}
              />
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default TeacherContent;
