import { createContext, useState, useContext } from 'react';

const initialState = {
  user: null,
};

const UserContext = createContext(initialState);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  //   For set UserData in context api
  const setUserDataHandler = (userObj) => {
    setUserData(userObj);
  };
  return (
    <UserContext.Provider value={{ user: userData, setUserDataHandler }}>
      {children}
    </UserContext.Provider>
  );
};
