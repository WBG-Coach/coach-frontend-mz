import { ReactNode } from "react";
import { FlexboxProps, LayoutProps, SpaceProps } from "styled-system";

export type CardProps = {
  children?: ReactNode;
  onClick?: () => void;
} & LayoutProps &
  SpaceProps &
  FlexboxProps;
