import { Flex } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import ModuleCard from "../../components/UI/Cards/ModuleCard";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ModulesContext } from "../../context/ModulesContext";

const Dashboard = () => {
  const { displayedModules } = useContext(ModulesContext);

  const nav = useNavigate();

  // const [userData, setUserData] = useState({});
  const [modules, setModules] = useState([]);
  // const [modulesList, setModulesList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("tokens")) nav("/login/");

    if (
      jwtDecode(JSON.parse(localStorage.getItem("tokens")).access).user_type !==
      "Student"
    )
      nav("/login/");

    const id = jwtDecode(JSON.parse(localStorage.getItem("tokens")).access).id;

    //   fetch(`http://127.0.0.1:8000/accounts/api/users/${id}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `Bearer ${
    //         JSON.parse(localStorage.getItem("tokens")).access
    //       }`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => setUserData(data))
    //     .catch((error) => console.error(error));

    //   fetch("http://127.0.0.1:8000/module/api/modules/", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `Bearer ${
    //         JSON.parse(localStorage.getItem("tokens")).access
    //       }`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => setModules(data))
    //     .catch((error) => console.error(error));
    // }, [nav]);

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

  useEffect(() => {
    if (displayedModules.length > 0) {
      setModules(displayedModules);
    }
  }, [displayedModules]);

  // useEffect(() => {
  //   if (userData.modules && modules.length > 0) {
  //     const filteredModules = modules.filter((module) =>
  //       userData.modules.includes(module.id)
  //     );
  //     setModulesList(filteredModules);
  //   }
  // }, [userData.modules, modules]);

  return (
    <Flex gap={"10"} justifyContent={"center"} wrap={"wrap"}>
      {modules.map((item, index) => {
        return (
          <ModuleCard key={index} module={item.module_name} id={item.id} />
        );
      })}
    </Flex>
  );
};

export default Dashboard;
