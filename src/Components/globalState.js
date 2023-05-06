import { createContext, useState } from "react";

const UserContext = createContext();
const initialUserState = {
  name: null,
  lastName: null,
  email: null,
  idUser: null,
  isLoggedIn: false,
};

function UserProvider(props) {
  const [user, setUser] = useState(initialUserState);

  const setLoginData = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(initialUserState);
  };

  return (
    <UserContext.Provider value={{ user, setLoginData, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
