import React from "react";
import { IconProps } from "./types";
import WorldIcon from "./icons/world.svg";
import HomeIcon from "./icons/home.svg";
import FileIcon from "./icons/file.svg";
import ChevronRightIcon from "./icons/chevron-right.svg";
import NotesIcon from "./icons/notes.svg";
import { Image } from "../Image";

const ICONS = {
  world: WorldIcon,
  file: FileIcon,
  home: HomeIcon,
  "chevron-right": ChevronRightIcon,
  notes: NotesIcon,
};

export const Icon: React.FC<IconProps> = (props) => {
  return <Image src={ICONS[props.name]} {...props} />;
};
