import { PositionProps, SpaceProps } from "styled-system";

export type IconProps = {
  size: number;
  color?: string;
  name:
    | "eye"
    | "edit-file"
    | "plus"
    | "home"
    | "file"
    | "close"
    | "world"
    | "notes"
    | "check"
    | "camera"
    | "comments"
    | "comments-outline"
    | "thumbs-up"
    | "file-blank"
    | "arrow-left"
    | "thumbs-down"
    | "chevron-right"
    | "clipboard-notes"
    | "chevron-bottom";
} & SpaceProps &
  PositionProps;
