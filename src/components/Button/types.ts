import { LayoutProps, SpaceProps } from "styled-system";

export type ButtonProps = {
  value: string;
  icon?: "world";
  onClick: () => void;
  variant?: "primary" | "secondary";
} & SpaceProps &
  LayoutProps;
