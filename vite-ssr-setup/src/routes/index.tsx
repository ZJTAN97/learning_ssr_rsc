import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <div style={{ marginLeft: "20px" }}>Hello!</div>,
});
