import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div style={{ marginLeft: "20px" }}>
      <Link to="/store">Navigate to store</Link>
    </div>
  ),
});
