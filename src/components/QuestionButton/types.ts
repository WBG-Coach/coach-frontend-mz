import { LayoutProps, SpaceProps } from "styled-system";

export type ButtonProps = {
  value: string;
  selected: boolean;
  onClick: () => void;
} & SpaceProps &
  LayoutProps;
