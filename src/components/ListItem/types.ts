import { ReactNode } from "react";

type ListItemProps = {
  title: string;
  imageUrl: string;
  description: string;
  onClick: () => void;
  children?: ReactNode;
  rigthContent?: ReactNode;
  key?: string | number;
};

export default ListItemProps;
