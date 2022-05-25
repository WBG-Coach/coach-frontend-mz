import { LayoutProps, SpaceProps } from "styled-system";

export type ButtonProps = {
  value: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
} & SpaceProps &
  LayoutProps;
