import {
  JustifyContentProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TextAlignProps,
} from "styled-system";

export type ButtonProps = {
  icon: "plus";
  onClick: () => void;
  isDisabled?: boolean;
  variant?: "primary" | "secondary";
} & SpaceProps &
  TextAlignProps &
  JustifyContentProps &
  LayoutProps &
  PositionProps;
