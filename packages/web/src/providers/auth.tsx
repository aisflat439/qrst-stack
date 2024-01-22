import React from "react";
import { useLocalStorage } from "usehooks-ts";

export type TAuthContext = {
  user: string | null;
  setUser: (user: string | null) => void;
  isAuth: boolean;
};

export const AuthContext = React.createContext<TAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<TAuthContext["user"]>("user", null);

  return (
    <AuthContext.Provider
      value={{
        isAuth: Boolean(user),
        setUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
