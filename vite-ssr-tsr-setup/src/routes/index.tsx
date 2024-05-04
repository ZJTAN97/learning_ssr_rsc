import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div style={{ marginTop: "20px" }}>
      <div>Try searching for something</div>
      <div style={{ marginTop: "10px" }}>
        <label>Search: </label>
        <input />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Link to="/store">Navigate to store</Link>
      </div>
    </div>
  ),
});
