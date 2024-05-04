import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DehydrateRouter } from "@tanstack/react-router-server";
import "@mantine/core/styles.css";

export const Route = createRootRouteWithContext<{ head: string }>()({
  component: () => <RootComponent />,
});

const RootComponent = () => {
  return (
    <div>
      <div>
        <Link to="/store">Navigate to Store</Link>
        <button onClick={() => console.log("clicked")}>Click me</button>
      </div>
      <Outlet />
      <DehydrateRouter />
    </div>
  );
};
