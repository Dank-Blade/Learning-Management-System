import React, { useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Input,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";
import EditModuleModal from "./EditModuleModal";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminModule = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modules, setModules] = React.useState([]);

  const nav = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("tokens")) nav("/admin/login/");

    if (
      jwtDecode(JSON.parse(localStorage.getItem("tokens")).access).user_type !==
      "Admin"
    )
      nav("/admin/login/");
    fetchModules();
  }, [nav]);

  const fetchModules = () => {
    fetch("http://127.0.0.1:8000/module/api/modules/", {
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
        setModules(data);
      })
      .catch((error) => console.error(error));
  };

  const toast = useToast();

  const [moduleData, setModuleData] = React.useState({});

  let { addModule } = useContext(AuthContext);

  const [filteredModules, setFilteredModules] = React.useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const [selectedModule, setSelectedModule] = React.useState("");

  const searchHandler = (e) => {
    const filtered = modules.filter((module) => {
      return (
        module.first_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        module.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        module.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilteredModules(filtered);
  };


  const moduleList = filteredModules.length > 0 ? filteredModules : modules;

  const submitHandler = (e) => {
    e.preventDefault();

    addModule({
      module_code: moduleData.module_code,
      module_name: moduleData.module_name,
    })
      .then((response) => {
        if (response.status === 201) {
          toast({
            title: "Moduke created.",
            description: "We've created a module for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          fetchModules();
          onClose();
          setModuleData({});
        }
      })
      .catch((err) => {
        toast({
          title: "Server error.",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const deleteHandler = (id) => {
    fetch(`http://127.0.0.1:8000/module/api/modules/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("tokens")).access
        }`,
      },
    }).then((data) => {
      console.log(data);

      fetchModules();
    });
    toast({
      title: "Deleted.",
      description: "Successfully deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const openEditModal = (id) => {
    setIsEditModalOpen(true);
    setSelectedModule(id);
  };

  const editHandler = (updatedData) => {
    setModules((prev) => {
      const index = prev.findIndex((m) => m.id === updatedData.id);
      prev[index] = updatedData;
      return [...prev];
    });
    setIsEditModalOpen(false);
    toast({
      title: "Account edited.",
      description: "Successfully edited.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex direction={"column"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent as={"form"} onSubmit={submitHandler}>
          <ModalHeader>Create Module</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} as={Flex} direction={"column"} gap={3}>
            <FormControl>
              <FormLabel>Module Code</FormLabel>
              <Input
                placeholder="Module Code"
                onChange={(e) =>
                  setModuleData((prev) => ({
                    ...prev,
                    module_code: e.target.value,
                  }))
                }
              />
            </FormControl>

            <HStack>
              <FormControl>
                <FormLabel>Module Name</FormLabel>
                <Input
                  placeholder="Module Name"
                  type={"text"}
                  onChange={(e) =>
                    setModuleData((prev) => ({
                      ...prev,
                      module_name: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type={"submit"}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justifyContent={"space-between"}>
        <Flex width={"60%"}>
          <Input
            type={"text"}
            placeholder={"Search"}
            onChange={(e) => searchHandler(e)}
          />
        </Flex>
        <Button
          bg={"#38A169"}
          color={"white"}
          transition={"all 0.2s ease-in-out"}
          onClick={onOpen}
          _hover={{
            bg: "#2F855A",
            transform: "scale(1.02)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          Add Module
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Nodule Code</Th>
              <Th>Module Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {moduleList.map((module, index) => (
              <Tr key={index}>
                <Td>{module.module_code}</Td>
                <Td>{module.module_name}</Td>
                <Td>
                  <Flex gap={2}>
                    <Button
                      bg={"#2B6CB0"}
                      onClick={() => openEditModal(module.id)}
                    >
                      <AiFillEdit color={"white"} />
                    </Button>
                    <Button
                      bg={"#E53E3E"}
                      onClick={() => deleteHandler(module.id)}
                    >
                      {isEditModalOpen && selectedModule === module.id && (
                        <EditModuleModal
                          isOpen={isEditModalOpen}
                          onClose={() => setIsEditModalOpen(false)}
                          data={module}
                          onEdit={editHandler}
                        />
                      )}
                      <AiFillDelete color={"white"} />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default AdminModule;
