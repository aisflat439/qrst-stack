import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { router } from "../main";

export function AuthConsumer() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
