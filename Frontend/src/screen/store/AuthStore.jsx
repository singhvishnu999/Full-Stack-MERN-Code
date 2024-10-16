import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthStore = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    const logout = await axios.get("http://localhost:8080/user/logout", {
      withCredentials: true,
    });
    if (logout.data.success) {
      setToken(null);
      navigate("/");
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const accessToken = async () => {
        try {
      let savedToken = await axios.get("http://localhost:8080/api/checkToken", {withCredentials:true});
      setToken(savedToken.data.token);
        }catch(err){
            console.log("error occured " + err)
        }
    };

    accessToken();
  }, []);

  return (
    <AuthStore.Provider value={{ token, setToken, handleLogout }}>
      {children}
    </AuthStore.Provider>
  );
};

export { AuthProvider, AuthStore };
