import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(null);
  let [registerData, setRegisterData] = useState(null);
  let [moduleData, setModuleData] = useState(null);
  let [user, setUser] = useState({});

  const toast = useToast();

  let loginUser = async ({ email, password }) => {
    let response = await fetch("http://127.0.0.1:8000/accounts/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("tokens", JSON.stringify(data));
    } else {
      toast({
        title: "Login Failed.",
        description: "Failed to login. Email or Password incorrect.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });  
    }
    return data;
  };

  let registerUser = async ({
    first_name,
    last_name,
    email,
    password,
    user_type,
  }) => {
    let response = await fetch("http://127.0.0.1:8000/accounts/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        user_type: user_type,
      }),
    });
    let data = await response.json();
    if (response.status === 201) {
      setRegisterData(data);
    } else {
      toast({
        title: "Registration Failed.",
        description: "Failed to register.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });  
    }
    return response;
  };

  let addModule = async ({ module_code, module_name }) => {
    let response = await fetch("http://127.0.0.1:8000/module/api/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("tokens")).access
        }`,
      },
      body: JSON.stringify({
        module_code: module_code,
        module_name: module_name,
      }),
    });
    let data = await response.json();
    if (response.status === 201) {
      setModuleData(data);
    } else {
      toast({
        title: "Module Addition Failed.",
        description: "Failed to add module.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    return response;
  };

  let changePassword = async ({ old_password, new_password }) => {
    let response = await fetch(
      "http://127.0.0.1:8000/accounts/api/change-password/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("tokens")).access
          }`,
        },
        body: JSON.stringify({
          old_password: old_password,
          new_password: new_password,
        }),
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      console.log(data);
    } else {
      toast({
        title: "Password Change Failed.",
        description: "Failed to change password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    return response;
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    registerUser: registerUser,
    addModule: addModule,
    changePassword: changePassword,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
