import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DehydrateRouter } from "@tanstack/react-router-server";
import { AppShell, createTheme, MantineProvider, Text } from "@mantine/core";
import "@mantine/core/styles.css";

export const Route = createRootRouteWithContext<{ head: string }>()({
  component: () => <RootComponent />,
  notFoundComponent: () => <div>Not found</div>,
});

const RootComponent = () => {
  const theme = createTheme({});

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
        }}
        padding="md"
      >
        <AppShell.Header>
          <Link to="/">Logo</Link>
        </AppShell.Header>

        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

        <AppShell.Main>
          <Text c="gray.1">Welcome to Demo of SSR with Tanstack Router</Text>
          <Outlet />
          <DehydrateRouter />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};
