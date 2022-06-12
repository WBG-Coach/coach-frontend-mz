import {
  JustifyContentProps,
  LayoutProps,
  SpaceProps,
  TextAlignProps,
} from "styled-system";

export type ButtonProps = {
  value: string;
  onClick: () => void;
  isSelected?: boolean;
  selectedColor?: string | null;
  selectedIcon?: "thumbs-up" | "thumbs-down" | null;
  variant?: "primary" | "secondary";
} & SpaceProps &
  TextAlignProps &
  JustifyContentProps &
  LayoutProps;
