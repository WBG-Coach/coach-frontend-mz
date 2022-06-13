import React from "react";
import { IconProps } from "./types";
import HomeIcon from "./icons/home.svg";
import FileIcon from "./icons/file.svg";
import PlusIcon from "./icons/plus.svg";
import WorldIcon from "./icons/world.svg";
import CheckIcon from "./icons/check.svg";
import NotesIcon from "./icons/notes.svg";
import CloseIcon from "./icons/close.svg";
import CameraIcon from "./icons/camera.svg";
import CommentsIcon from "./icons/comments.svg";
import ThumbsUpIcon from "./icons/thumbs-up.svg";
import ArrowLeftIcon from "./icons/arrow-left.svg";
import FileBlankIcon from "./icons/file-blank.svg";
import ThumbsDownIcon from "./icons/thumbs-down.svg";
import ChevronRightIcon from "./icons/chevron-right.svg";
import ChevronBottomIcon from "./icons/chevron-bottom.svg";
import ClipboardNotesIcon from "./icons/clipboard-notes.svg";
import { Image } from "../Image";

const ICONS = {
  file: FileIcon,
  home: HomeIcon,
  plus: PlusIcon,
  world: WorldIcon,
  notes: NotesIcon,
  check: CheckIcon,
  close: CloseIcon,
  camera: CameraIcon,
  comments: CommentsIcon,
  "thumbs-up": ThumbsUpIcon,
  "arrow-left": ArrowLeftIcon,
  "file-blank": FileBlankIcon,
  "thumbs-down": ThumbsDownIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-bottom": ChevronBottomIcon,
  "clipboard-notes": ClipboardNotesIcon,
};

export const Icon: React.FC<IconProps> = (props) => {
  return <Image src={ICONS[props.name]} {...props} />;
};
