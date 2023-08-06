import { useDisclosure } from "@chakra-ui/react";
import DrawerModule from "../../components/UI/DrawerModule";
import ModuleNavbar from "../../components/UI/ModuleNavbar";
import DetailedAssignmentCard from "../../components/UI/Cards/DetailedAssignmentCard";

const TeacherDetailedAssignment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModuleNavbar onOpen={onOpen} />
      <DrawerModule isOpen={isOpen} onClose={onClose} />

      <DetailedAssignmentCard />
    </>
  );
};

export default TeacherDetailedAssignment;
