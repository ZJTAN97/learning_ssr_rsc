import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/store")({
  component: () => <StorePage />,
});

const StorePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Link to="/">Navigate back to home</Link>
      <div>
        <button onClick={() => navigate({ to: "/" })}>Back</button>
      </div>
    </div>
  );
};
