import React from "react";
import { AuthContext } from "../providers/auth";

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("the useAuth hook must be used inside an <AuthProvider>");
  }
  return context;
}
