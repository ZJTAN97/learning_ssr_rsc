import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { build as esbuild } from "esbuild";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import * as ReactServerDom from "react-server-dom-webpack/server.browser";

const app = new Hono();
const clientComponentMap = {};

app.get("/", async (c) => {
  // Note This will raise a type error until you build with `npm run dev`
  const Page = await import("./build/page.js");
  const Comp = createElement(Page.default);

  const stream = ReactServerDom.renderToReadableStream(Comp);
  return new Response(stream);
});

/**
 * Build both server and client components with esbuild
 */
async function build() {
  const clientEntryPoints = new Set();

  /** Build the server component tree */
  await esbuild({
    bundle: true,
    format: "esm",
    logLevel: "error",
    entryPoints: [resolveApp("page.jsx")],
    outdir: resolveBuild(),
    // avoid bundling npm packages for server-side components
    packages: "external",
  });
}

serve(app, async (info) => {
  await build();
  console.log(`Listening on http://localhost:${info.port}`);
});

/** UTILS */

const appDir = new URL("./src/", import.meta.url);
const buildDir = new URL("./build/", import.meta.url);

function resolveApp(path = "") {
  return fileURLToPath(new URL(path, appDir));
}

function resolveBuild(path = "") {
  return fileURLToPath(new URL(path, buildDir));
}
