import { ReactNode } from "react";

type ListItemProps = {
  title: string;
  imageUrl: string;
  description: string;
  onClick: () => void;
  children?: ReactNode;
  rigthContent?: ReactNode;
};

export default ListItemProps;
