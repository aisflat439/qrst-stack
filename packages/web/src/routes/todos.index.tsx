import { FileRoute } from "@tanstack/react-router";

// import { apiUtils } from "../utils/trpc";

export const Route = new FileRoute("/todos/").createRoute({
  loader: () => {
    // const res = await apiUtils.getUser.ensureData("5");
    const res = { name: "test" };
    return res;
  },
  component: TodosIndexComponent,
});

// const api = new RouteApi({ id: "/" });

function TodosIndexComponent() {
  //   const { res } = api.useLoaderData();
  //   console.log("res: ", res);

  return (
    <div className="p-2">
      <div className="p-2">
        <strong>no total todos</strong>.
      </div>
    </div>
  );
}
