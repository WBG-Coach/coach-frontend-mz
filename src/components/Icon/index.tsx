import React from "react";
import { StyledIcon } from "./styles";
import { IconProps } from "./types";
import WorldIcon from "./icons/world.svg";
import HomeIcon from "./icons/home.svg";
import FileIcon from "./icons/file.svg";
import ChevronRightIcon from "./icons/chevron-right.svg";
import NotesIcon from "./icons/notes.svg";

const ICONS = {
  world: WorldIcon,
  file: FileIcon,
  home: HomeIcon,
  "chevron-right": ChevronRightIcon,
  notes: NotesIcon,
};

export const Icon: React.FC<IconProps> = (props) => {
  return <StyledIcon src={ICONS[props.name]} {...props} />;
};
