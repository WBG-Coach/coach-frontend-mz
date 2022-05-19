import { ReactNode } from "react";
import { FlexboxProps, LayoutProps, SpaceProps } from "styled-system";

export type HeaderProps = {
  children?: ReactNode;
} & LayoutProps &
  SpaceProps &
  FlexboxProps;
