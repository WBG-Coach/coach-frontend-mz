import {
  JustifyContentProps,
  LayoutProps,
  SpaceProps,
  TextAlignProps,
} from "styled-system";

export type ButtonProps = {
  value: string;
  icon?: "world";
  onClick: () => void;
  variant?: "primary" | "secondary";
} & SpaceProps &
  TextAlignProps &
  JustifyContentProps &
  LayoutProps;
