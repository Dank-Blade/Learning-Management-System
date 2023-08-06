import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const AuthVerify = () => {
//   let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("tokens"));

    if (user) {
      const decodedJwt = jwtDecode(user.access);

      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("tokens");
      }
    }
  }, []);

  return ;
};

export default AuthVerify;
