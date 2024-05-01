import express from "express";

export async function createServer(root = process.cwd()) {
  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  const vite = await (
    await import("vite")
  ).createServer({
    root: process.cwd(),
    logLevel: "info",
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      if (url.includes(".")) {
        console.warn(`${url} is not valid router path`);
        res.status(404);
        res.end(`${url} is not valid router path`);
        return;
      }

      // Extract the head from vite's index transformation hook
      let viteHead = await vite.transformIndexHtml(
        url,
        `<html><head></head><body></body></html>`
      );

      viteHead = viteHead.substring(
        viteHead.indexOf("<head>") + 6,
        viteHead.indexOf("</head>")
      );

      const entry = await (async () => {
        return vite.ssrLoadModule("/src/entry-server.tsx");
      })();

      console.log("Rendering: ", url, "...");
      await entry.render({ req, res, url, head: viteHead });
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

createServer().then(async ({ app }) =>
  app.listen(5173, () => {
    console.log("Client Server: http://localhost:5173");
  })
);
