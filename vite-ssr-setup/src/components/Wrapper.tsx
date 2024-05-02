import { MantineProvider } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

export const Wrapper = (props: Props) => {
  return <MantineProvider>{props.children}</MantineProvider>;
};
