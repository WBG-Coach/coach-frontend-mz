import { PositionProps, SpaceProps } from "styled-system";

export type IconProps = {
  size: number;
  name:
    | "home"
    | "file"
    | "world"
    | "notes"
    | "check"
    | "arrow-left"
    | "chevron-right"
    | "chevron-bottom";
} & SpaceProps &
  PositionProps;
