import ReactDOM from "react-dom/client";
import { Router } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeTree } from "./routeTree.gen";
import "./index.css";

import { queryClient, trpc, trpcClient } from "./utils/trpc";
import { AuthProvider } from "./providers/auth";
import { AuthConsumer } from "./providers/AuthConsumer";

// Set up a Router instance
export const router = new Router({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: {
      user: null,
      setUser: () => {},
      isAuth: false,
    },
    search: {
      redirect: "",
      token: "",
    },
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthConsumer />
        </AuthProvider>
        <ReactQueryDevtools position={"right"} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
