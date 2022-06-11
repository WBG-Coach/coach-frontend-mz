import React from "react";
import { IconProps } from "./types";
import WorldIcon from "./icons/world.svg";
import HomeIcon from "./icons/home.svg";
import FileIcon from "./icons/file.svg";
import ChevronRightIcon from "./icons/chevron-right.svg";
import CheckIcon from "./icons/check.svg";
import NotesIcon from "./icons/notes.svg";
import ChevronBottomIcon from "./icons/chevron-bottom.svg";
import ArrowLeftIcon from "./icons/arrow-left.svg";
import CloseIcon from "./icons/close.svg";
import ThumbsUpIcon from "./icons/thumbs-up.svg";
import ThumbsDownIcon from "./icons/thumbs-down.svg";
import FileBlankIcon from "./icons/file-blank.svg";
import { Image } from "../Image";

const ICONS = {
  world: WorldIcon,
  file: FileIcon,
  home: HomeIcon,
  notes: NotesIcon,
  check: CheckIcon,
  close: CloseIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-bottom": ChevronBottomIcon,
  "arrow-left": ArrowLeftIcon,
  "thumbs-down": ThumbsDownIcon,
  "thumbs-up": ThumbsUpIcon,
  "file-blank": FileBlankIcon,
};

export const Icon: React.FC<IconProps> = (props) => {
  return <Image src={ICONS[props.name]} {...props} />;
};
