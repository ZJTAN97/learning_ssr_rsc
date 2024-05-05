import { Stack, TextInput } from "@mantine/core";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <Stack>
      <div>Try searching for something</div>
      <TextInput placeholder="Search for something" />
      <div style={{ marginTop: "20px" }}>
        <Link to="/store">Navigate to store</Link>
      </div>
    </Stack>
  ),
});
