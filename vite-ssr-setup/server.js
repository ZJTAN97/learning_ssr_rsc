import express from "express";
import fs from "node:fs/promises";

export async function createServer(root = process.cwd()) {
  const app = express();

  // Vite Instance

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

  // use Vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl.replace("/", "");

      let template;

      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);

      const viteHead = template.substring(
        template.indexOf("<head>") + 6,
        template.indexOf("</head>")
      );

      const entry = await (async () => {
        return vite.ssrLoadModule("/src/entry-server.tsx");
      })();

      await entry.render({ req, res, url, head: viteHead, template });
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
