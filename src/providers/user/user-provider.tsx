"use client";
import { initFirebase } from "@/lib/firebase";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>> | null;
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

  initFirebase();

  const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
