import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";
import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  ssr: {
    noExternal: fs
      .readdirSync(path.join(__dirname, "node_modules"), {
        withFileTypes: true,
      })
      .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."))
      .map((dirent) => new RegExp(dirent.name)),
  },
});
