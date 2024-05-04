import { Button } from "@mantine/core";
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

  console.log(formMethods.watch());

  return (
    <div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Button onClick={() => console.log("im working!!")}>it works!</Button>
        <form>
          <div>
            <label>Store name: </label>
            <input {...formMethods.register("name")} />
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <label>Store location: </label>
            <input {...formMethods.register("location")} />
          </div>
        </form>
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button onClick={() => navigate({ to: "/" })}>
          Back to landing page
        </button>
      </div>
    </div>
  );
};
