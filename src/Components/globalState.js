import { createContext, useState } from "react";

const UserContext = createContext();
const initialUserState = {
  name: "",
  lastName: "",
  email: "",
  idUser: null,
  isLoggedIn: false,
};

function UserProvider(props) {
  const [user, setUser] = useState(initialUserState);
  const setLoginData = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("token")
    setUser(initialUserState);
  };

  return (
    <UserContext.Provider value={{ user, setLoginData, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
