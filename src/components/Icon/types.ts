import { PositionProps, SpaceProps } from "styled-system";

export type IconProps = {
  size: number;
  name:
    | "plus"
    | "home"
    | "file"
    | "close"
    | "world"
    | "notes"
    | "check"
    | "camera"
    | "thumbs-up"
    | "file-blank"
    | "arrow-left"
    | "thumbs-down"
    | "chevron-right"
    | "chevron-bottom";
} & SpaceProps &
  PositionProps;
