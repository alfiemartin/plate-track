"use client";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>> | null
}

const UserContext = createContext<AuthContext>({ user: null, setUser: null });
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>
    {children}
  </UserContext.Provider>;
};

export default UserProvider;
