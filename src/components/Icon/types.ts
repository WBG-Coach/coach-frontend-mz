import { PositionProps, SpaceProps } from "styled-system";

export type IconProps = {
  size: number;
  name:
    | "home"
    | "file"
    | "close"
    | "world"
    | "notes"
    | "check"
    | "thumbs-up"
    | "file-blank"
    | "arrow-left"
    | "thumbs-down"
    | "chevron-right"
    | "chevron-bottom";
} & SpaceProps &
  PositionProps;
