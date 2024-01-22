import React from "react";
import { FileRoute, useRouter } from "@tanstack/react-router";

import { useAuth } from "../hooks/useAuth";

export const Route = new FileRoute("/about").createRoute({
  component: AboutComponent,
});

function AboutComponent() {
  const { setUser, isAuth } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuth) {
      router.history.push("/");
    }
  }, [setUser, router.history, isAuth]);

  return (
    <div className="p-2">
      <h3 className="bg-blue-600">About</h3>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Log out
      </button>
    </div>
  );
}
