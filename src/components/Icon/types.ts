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
    | "comments"
    | "thumbs-up"
    | "file-blank"
    | "arrow-left"
    | "thumbs-down"
    | "chevron-right"
    | "clipboard-notes"
    | "chevron-bottom";
} & SpaceProps &
  PositionProps;
