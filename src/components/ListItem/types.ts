import { ReactNode } from "react";

type ListItemProps = {
  title: string;
  imageUrl?: string;
  leftContent?: ReactNode;
  description: string;
  onClick: () => void;
  children?: ReactNode;
  rightContent?: ReactNode;
};

export default ListItemProps;
