import ReactDOM from "react-dom/client";
import { createRouter } from "./router";
import { StartClient } from "@tanstack/react-router-server/client";

const router = createRouter();

console.log("[INFO] Client detected and hydrating the DOM");

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StartClient router={router} />
);
