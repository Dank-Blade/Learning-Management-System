import { useDisclosure } from "@chakra-ui/react";
import DetailedContentCard from "../../components/UI/Cards/DetailedContentCard";
import DrawerModule from "../../components/UI/DrawerModule";
import ModuleNavbar from "../../components/UI/ModuleNavbar";

const TeacherDetailedContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModuleNavbar onOpen={onOpen} />
      <DrawerModule isOpen={isOpen} onClose={onClose} />

      <DetailedContentCard />
    </>
  );
};

export default TeacherDetailedContent;
