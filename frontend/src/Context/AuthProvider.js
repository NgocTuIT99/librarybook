import { createContext, useContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { logOut } from "../service/userService";

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [selectedForm, setSelectedForm] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState(null);

  const logout = async () => {
    //await logOut(accessToken);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        selectedForm,
        setSelectedForm,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
