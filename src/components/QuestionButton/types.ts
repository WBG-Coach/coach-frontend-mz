import { LayoutProps, SpaceProps } from "styled-system";

export type ButtonProps = {
  value: string | number;
  selected: boolean;
  onClick: () => void;
} & SpaceProps &
  LayoutProps;
