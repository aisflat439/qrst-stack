import {
  Link,
  Outlet,
  redirect,
  rootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { TAuthContext } from "../providers/auth";
import { z } from "zod";

type RouterContext = {
  auth: TAuthContext;
  search: {
    redirect?: string;
    token?: string;
  };
};

const searchSchema = z.object({
  redirect: z.string().catch("/"),
  token: z.string().catch(""),
});

export const Route = rootRouteWithContext<RouterContext>()({
  validateSearch: searchSchema,
  beforeLoad: ({ context, location, search }) => {
    if (!context.auth.isAuth && !location.pathname.includes("login")) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href, token: search.token },
      });
    }
  },
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/parts" className="[&.active]:font-bold">
          Parts
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
