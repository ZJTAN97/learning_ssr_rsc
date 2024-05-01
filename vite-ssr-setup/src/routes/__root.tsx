import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DehydrateRouter } from "@tanstack/react-router-server";
import { useState } from "react";

export const Route = createRootRouteWithContext<{ head: string }>()({
  component: () => <RootComponent />,
});

const RootComponent = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Please work</title>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
          import RefreshRuntime from "/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
          `,
          }}
        />
        <script type="module" src="/@vite/client" />
        <script type="module" src="/src/entry-client.tsx"></script>
      </head>
      <body>
        <div id="root">
          <div>
            <Link to="/store">Navigate to Store</Link>
            <button onClick={() => console.log("clicked")}>Click me</button>
          </div>
          <Outlet />
          <DehydrateRouter />
        </div>
      </body>
    </html>
  );
};
