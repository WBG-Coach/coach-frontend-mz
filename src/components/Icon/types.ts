import { PositionProps, SpaceProps } from "styled-system";

export type IconProps = {
  name: "world" | "chevron-right" | "home" | "file" | "notes";
  size: number;
} & SpaceProps &
  PositionProps;
