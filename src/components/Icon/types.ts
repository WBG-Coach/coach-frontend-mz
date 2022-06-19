import { PositionProps, SpaceProps } from "styled-system";

export type IconProps = {
  size: number;
  color?: string;
  name:
    | "eye"
    | "plus"
    | "home"
    | "file"
    | "close"
    | "world"
    | "notes"
    | "check"
    | "camera"
    | "comments"
    | "edit-file"
    | "thumbs-up"
    | "file-blank"
    | "graduation"
    | "arrow-left"
    | "thumbs-down"
    | "chevron-right"
    | "clipboard-notes"
    | "comments-outline"
    | "chevron-bottom";
} & SpaceProps &
  PositionProps;
