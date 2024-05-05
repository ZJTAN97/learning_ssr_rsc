import { Button, Stack, TextInput } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/store")({
  component: () => <StorePage />,
});

const StorePage = () => {
  const navigate = useNavigate();

  const formMethods = useForm({
    defaultValues: {
      name: "",
      location: "",
    },
  });

  return (
    <Stack gap="md">
      <form>
        <TextInput label="Name" {...formMethods.register("name")} />
        <TextInput label="Location" {...formMethods.register("location")} />
      </form>
      <Button onClick={() => navigate({ to: "/" })}>
        Back to landing page
      </Button>
    </Stack>
  );
};
