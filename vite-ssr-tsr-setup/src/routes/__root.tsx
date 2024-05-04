import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DehydrateRouter } from "@tanstack/react-router-server";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export const Route = createRootRouteWithContext<{ head: string }>()({
  component: () => <RootComponent />,
  notFoundComponent: () => <div>Not found</div>,
});

const RootComponent = () => {
  const theme = createTheme({});

  return (
    <MantineProvider theme={theme}>
      <div>
        <Link to="/">Welcome to Demo of SSR with Tanstack Router</Link>
      </div>
      <Outlet />
      <DehydrateRouter />
    </MantineProvider>
  );
};
