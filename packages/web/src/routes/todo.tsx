import { FileRoute, Outlet } from "@tanstack/react-router";

export const Route = new FileRoute("/todos").createRoute({
  component: TodosRoute,
});

function TodosRoute() {
  return (
    <div className="p-2">
      <h3 className="bg-blue-600">Todos</h3>
      <div>
        <div>
          <p>Create a part</p>
        </div>
        <div>
          <p>Upload some todos</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
