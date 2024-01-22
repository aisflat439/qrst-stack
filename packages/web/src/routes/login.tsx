import { FileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { z } from "zod";
import React from "react";

export const Route = new FileRoute("/login").createRoute({
  component: LoginComponent,
  validateSearch: z.object({
    redirect: z.string().optional(),
    token: z.string().optional(),
  }),
});

function LoginComponent() {
  const url = `${import.meta.env.VITE_API_URL}/auth/google/authorize`;
  const { setUser, isAuth } = useAuth();
  const router = useRouter();
  const { redirect, token } = Route.useSearch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token) {
      setUser(token);
      navigate({
        search: (prev) => {
          delete prev.token;
          delete prev.redirect;
          return prev;
        },
      });
    }
  }, [setUser, token, navigate]);

  React.useEffect(() => {
    if (isAuth) {
      router.history.push(redirect || "/");
    }
  }, [router.history, isAuth, redirect]);

  return (
    <div className="p-2">
      <h3>Login</h3>
      <a href={url}>Sign in with Google</a>
    </div>
  );
}
